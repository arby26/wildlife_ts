import fs from 'fs/promises';
import chokidar from 'chokidar';
import { EventEmitter } from 'stream';
import path from 'path';

type ConsoleLog = {
  time: string,
  data: string,
}

class GameInterface extends EventEmitter {
  #wildlifeDir = path.join(
    process.env.LOCALAPPDATA,
    'WildLifeC/Saved/SandboxSaveGames/CustomSaves'
  );

  #signature = 'TypescriptToLuaLoader';
  #scriptName: string;
  #lastUpdateFile: string;
  #bundleFile: string;
  #printFile: string;
  #evalFile: string;
  
  #watcher: chokidar.FSWatcher;
  #printCache: ConsoleLog[]  = [];

  constructor(scriptName: string) {
    super();
    this.#scriptName = scriptName;
    this.#lastUpdateFile = `${this.#signature}LastUpdate${scriptName}.save`;
    this.#bundleFile = `${this.#signature}Bundle${scriptName}.save`;
    this.#printFile = `${this.#signature}Print${scriptName}.save`;
    this.#evalFile = `${this.#signature}Eval${scriptName}.save`;

    this.#watcher = chokidar.watch(this.#wildlifeDir);
    this.#watcher.on('add', file => this.#handleAdd(file));
    this.#watcher.on('change', file => this.#handleChange(file));
  }

  async #handleAdd(file: string): Promise<void> {
    const name = path.parse(file).base;
    switch(name) {
      case this.#printFile:
        return this.#updatePrintCache()
      default:
        return;
    }
  }

  async #handleChange(file: string) {

  }

  async runFile(file: string) {
    await Promise.all([
      fs.copyFile(file, path.join(this.#wildlifeDir, this.#bundleFile)),
      fs.writeFile(this.#lastUpdateFile, Date.now().toString()),
    ]);
  }

  async eval(code: string) {
    await fs.appendFile(
      path.join(this.#wildlifeDir, this.#evalFile),
      code.replace(/\n/g, '\\n')
    )
  }

  async #updatePrintCache() {
    const data = await fs.readFile(this.#printFile);

    const logs = data
      .toString()
      .split(/\n/g)
      .map(data => JSON.parse(data)) as ConsoleLog[];
  
    this.#printCache.push(...logs);
    this.emit('print');
  
    await fs.writeFile(this.#printFile, '');
  }
}