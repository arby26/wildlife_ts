__counter__ = 0
function setTimeout(delay, cb)
  local id = '__timeout_cb_' .. __counter__ .. '__'
  __counter__ = __counter__ + 1
  _G[id] = cb;
  wl_execute_delayed(delay / 1000, id .. '()\n' .. id .. ' = nil')
end

function setInterval(delay, cb)
  local idCount = __counter__
  __counter__ = __counter__ + 1
  local id = '__interval_cb_' .. idCount .. '__'
  local delayInSec = delay / 1000

  local function callback()
    wl_execute_delayed(delayInSec, id .. '()')
    cb()
  end

  wl_execute_delayed(delayInSec, id .. '()')

  _G[id] = callback;
  return idCount;
end

function clearInterval(id)
  local idStr = '__interval_cb_' .. idCount .. '__'

  local function cleanInterval
    _G[idStr] = nil;
  end

  _G[idStr] = cleanInterval
end
  
  