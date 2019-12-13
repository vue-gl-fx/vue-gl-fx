
import { getHash } from '../helpers/webGLHelper';

export default class ProgramStore {
    constructor(){
       this._data = new Map();
    }
  
    addProgram(src, program){
        const hash = getHash(src);
        return this.addProgramByHash(hash, program)
    }

    addProgramByHash(hash, program){
        return this._data.set(hash, program);
    }

    getProgram(src){
        const hash = getHash(src);
        return this.getProgramByHash(hash);
    }

    getProgramByHash(hash){
        return this._data.get(hash);
    }

    removeProgram(src){
        const hash = getHash(src);
        return this.removeProgramByHash(hash);
    }

    removeProgramByHash(hash){
        return this._data.delete(hash);
    }

    getAll(){
        return Array.from(this._data.values());
    }

    clear(){
        this._data.clear();
    }
  
  }