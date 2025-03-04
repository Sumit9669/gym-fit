export interface IBaseRepository<T>{
    add(item:T):void;
    getById(itemId:string):T|undefined;
    getAll():T[];
    update(id:string, payload:T):void;
    delete(id:string):void;
}

export abstract class BaseRepository<T> implements IBaseRepository<T>{
    protected items:Map<string, T>= new Map();
    add(item: T): void {
        const id = (item as any).id;
        this.items.set(id,item);
    }
    getById(itemId: string): T | undefined {
        return this.items.get(itemId);
    }
    getAll(): T[] {
        return Array.from(this.items.values());
    }
    update(id: string, payload: T): void {
       if(this.items.has(id)){
        this.items.set(id, payload);
    }    else{
        throw Error('Id not found');
    }
     }
    delete(id: string): void {
        if(this.items.has(id)){
            this.items.delete(id);
        }    else{
            throw Error('Id not found');
        }
    }
    
}