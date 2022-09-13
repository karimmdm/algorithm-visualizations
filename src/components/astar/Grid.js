import Node from './Node';

export default class Grid{
    constructor(_width, _height){
        this.size = [_height, _width];
        this.gridArray = [];
        this.start = null;
        this.end = null;

        for(let i = 0; i < this.size[1]; i++){
            let row = []
            for(let j = 0; j < this.size[0]; j++){
                row.push( new Node(false, [i,j]) );
            }
            this.gridArray.push(row);
        }

        
    }

    getStart(){
        return this.start;
    }

    setStart(clear = false, _position = [0,0]){
        if(clear){
            this.start = null;
        }
        else if(!this.end || (this.end.position[0] !== _position[0] || this.end.position[1] !== _position[1])){
            this.start = this.gridArray[_position[0]][_position[1]];
            this.start.unblock();
        }
        return this.start;
    }

    getEnd(){
        return this.end;
    }

    setEnd(clear = false, _position = [this.width-1,this.height-1]){
        if(clear){
            this.end = null;
        }
        else if(!this.start || (this.start.position[0] !== _position[0] || this.start.position[1] !== _position[1])){
            this.end = this.gridArray[_position[0]][_position[1]];
            this.end.unblock();
        }
        return this.end;
    }

    getGrid() {
        return this.gridArray;
    }

    clear(){
        for(const row of this.gridArray){
            for(const node of row){
                node.unblock();
            }
        }

        this.setStart(true);
        this.setEnd(true);
    }

    getNeighbours(node){
        let r = node.position[0];
        let c = node.position[1];

        let neighbors = [];
        for(let i = -1; i <= 1; i++){
            for(let j = -1; j <= 1; j++){
                if(i === 0 && j === 0){
                    continue;
                }
                let x = c + j;
                let y = r + i;
                if(x < 0 || y < 0 || y >= this.gridArray.length || x >= this.gridArray[r].length){
                    continue;
                }
                neighbors.push(this.gridArray[y][x]);
            }
        }

        return neighbors;
    }

}
