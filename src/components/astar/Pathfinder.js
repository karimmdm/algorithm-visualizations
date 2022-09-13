export default class Pathfinder{
    constructor(_grid){
        this.grid = _grid; 
    }

    reconstructPath(startNode, endNode){
        let total_path = [];
        let current = endNode;
        while(current !== startNode){
            total_path.push(current);
            current = current.parent;
        }
        return total_path;
    }

    findPath(startNode, endNode){    
        let openSet = []; //the set of nodes to be evaluated
        let closedSet = new Set(); //the set of nodes already evaluated
        openSet.push(startNode); 

        while(openSet.length > 0){
            // current is node in the openSet with the lowest fCost
            let current = openSet[0];
            let currentIndex = 0;
            for(let i = 1; i < openSet.length; i++){
                if(openSet[i].fCost < current.fCost || (openSet[i].fCost === current.fCost && openSet[i].hCost < current.hCost)){
                    current = openSet[i];
                    currentIndex = i;
                }
            }
            //remove current from openSet
            openSet.splice(currentIndex, 1);
            //add current to closed
            closedSet.add(current);

            if(current === endNode){
                return this.reconstructPath(startNode, endNode);;
            }

            let neighbours = this.grid.getNeighbours(current);
            for(let neighbour of neighbours){
                if(neighbour.isBlocked() || closedSet.has(neighbour)){
                    continue;
                }

                let tentativeGCost = this.getDistance(current, neighbour);
                let neighbourInOpen = openSet.find(elem => elem === neighbour);
                if(tentativeGCost < neighbour.gCost || !neighbourInOpen){
                    neighbour.gCost = tentativeGCost;
                    neighbour.hCost = this.getDistance(neighbour, endNode);
                    neighbour.parent = current;

                    if(!neighbourInOpen){
                        openSet.push(neighbour);
                    }
                }
            }
        }

        return []
    }

    getDistance(nodeA, nodeB){
        let xDist = Math.abs(nodeA.position[1] - nodeB.position[1]);
        let yDist = Math.abs(nodeA.position[0] - nodeB.position[0]);

        if(xDist > yDist){
            return 14*yDist + (10*(xDist - yDist))
        }
        return 14*xDist + (10*(yDist - xDist))
    }
}