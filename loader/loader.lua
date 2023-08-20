local checkDelay = 0.25
local lastUpdated = 0
local self = wl_get_object_self();
local scriptName = string.gsub(wl_get_object_name(self), "[^a-zA-Z0-9]", "")
local checkIntervalIdentifier = '__loader_check_interval_' .. scriptName .. '__'
local printOverrideIdentifier = '__print_override_' .. scriptName .. '__';
local signature = 'TypescriptToLuaLoader'
local lastUpdateFile = signature .. 'LastUpdate' .. scriptName
local bundleFile = signature .. 'Bundle' .. scriptName
local printFile = signature .. 'Log' .. scriptName
local evalFile = signature .. 'Eval' .. scriptName
local printBuffer = []

local function dump(o)
  if type(o) == 'table' then
     local s = '{ '
     for k,v in pairs(o) do
        if type(k) ~= 'number' then k = '"'..k..'"' end
        s = s .. '['..k..'] = ' .. dump(v) .. ','
     end
     return s .. '} '
  else
     return tostring(o)
  end
end

local function print(data)
  local str = dump(data)
  local time = os.date('%H:%M:%S')
  local json = '{"time":"' .. time .. '", "data":"' .. escapeJsonString(str) .. '"}'
  _G.print(time .. " : " .. str)
  printBuffer = printBuffer .. json .. '\n'
end

if(not wl_data_exists(lastUpdateFile)) then
  wl_data_save("", lastUpdateFile)
  print('created' .. lastUpdateFile)
end

if(not wl_data_exists(bundleFile)) then
  wl_data_save("", bundleFile)
  print('created' .. bundleFile)
end

local function eval(code)
  local updatedCode = 'local print = ' .. printOverrideIdentifier .. '\n' .. code
  wl_dispatch_event_to_object('__EVAL__', updatedCode, self)
end

local function check()
  -- If there is anything in the print buffer, write to save file
  if(printBuffer ~= "") then
    wl_data_save(printBuffer, printFile)
    printBuffer = ""
  end

  local evalData = wl_data_load(evalFile);

  -- Run all commands in the eval list, delete list after, as this is only for one time evaluations like a console
  if(type(evalData) == 'table') then
    for i, code in ipairs(evalData) do
      eval(code)
    end
    wl_data_delete(evalFile)
  end

  local newLastUpdated = wl_data_load(lastUpdateFile)

  -- If the lastUpdated file has been updated, get the new code
  -- If the file does not exist or is empty, don't do anything
  if(newLastUpdated == "" or newLastUpdated == nil or newLastUpdated <= lastUpdated) then
    return
  end

  lastUpdated = newLastUpdated

  local code = wl_data_load(bundleFile)

  -- If the code file is empty, there is nothing to do
  if(code == "" or code == nil) then
    return
  end

  print('Reloading code...')

  -- Eval the code
  eval(code)
end

local function callback()
  wl_execute_delayed(delayInSec, checkIntervalIdentifier .. '()')
  check()
end

_G[checkIntervalIdentifier] = check;
_G[printOverrideIdentifier] = print;

callback()