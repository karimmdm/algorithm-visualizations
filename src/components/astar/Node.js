export default class Node{
    constructor(_blocked, _position){
        this.blocked = _blocked;
        this.position = _position;
        this.gcost = 0;
        this.hcost = 0;
        this.parentNode = null;
    }
    get parent(){
        return this.parentNode;
    }

    set parent(pNode){
        this.parentNode = pNode;
    }

    get hCost(){
        return this.hcost;
    }

    set hCost(value){
        this.hcost = value;
    }

    get gCost(){
        return this.gcost;
    }

    set gCost(value){
        this.gcost = value;
    }

    get fCost(){
        return this.gCost + this.hCost;
    }


    isBlocked(){
        return this.blocked;
    }

    block() {
        this.blocked = true;
    }

    unblock() {
        this.blocked = false;
    }
}