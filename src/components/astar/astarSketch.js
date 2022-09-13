import React from 'react';
// import Sketch from 'react-p5';
import P5Wrapper from 'react-p5-wrapper';
import Grid from './Grid';
import Pathfinder from './Pathfinder';
import { Divider, Button, Panel, Radio, RadioGroup } from 'rsuite';
 


function AstarSketch(){
    const cellSize = 20;
    const canvasWidth = 600;
    const canvasHeight = 600;
    const gridW = canvasWidth / cellSize;
    const gridH = canvasHeight / cellSize;
    let grid;
    let selector;
    let P5;
    let pathfinder;
    let path = [];
    
    function sketch(p5) {
        P5 = p5;
        p5.setup = () => {
            p5.createCanvas(canvasWidth, canvasHeight);
            grid = new Grid(gridW, gridH);
            pathfinder = new Pathfinder(grid);
            selector = "A";
        }
        
        p5.draw = () => {            
            // listener to detect changes to grid
            if(p5.mouseIsPressed && p5.mouseButton === p5.LEFT && selector === "A"){
                makeObstacles();
            }
            //listen for paths
            if(grid.getStart() && grid.getEnd()){
                path = pathfinder.findPath(grid.getStart(), grid.getEnd());
            }
            //draw the grid
            drawGrid(grid.getGrid());
        }


        function drawGrid(){
            P5.stroke("#9370DB");
            P5.strokeWeight(0.05);
            for (const row of grid.getGrid()){
                for(const node of row){
                    P5.fill("white");   
                    if (node.isBlocked()){
                        P5.fill("black");
                    }
                    P5.rect(node.position[1]*cellSize, node.position[0]*cellSize, cellSize, cellSize); 
                }
            }
            //draw any paths
            for(const node of path){
                P5.fill("#7cc5cf");
                P5.rect(node.position[1]*cellSize, node.position[0]*cellSize, cellSize, cellSize); 
            }
            //draw start and end nodes
            P5.fill("#9370DB");  
            if(grid.getStart())
                P5.rect(grid.getStart().position[1]*cellSize, grid.getStart().position[0]*cellSize, cellSize, cellSize); 
            P5.fill("red");
            if(grid.getEnd())
                P5.rect(grid.getEnd().position[1]*cellSize, grid.getEnd().position[0]*cellSize, cellSize, cellSize); 

            
        }

        p5.mouseClicked = () => {
            let r = Math.floor(P5.mouseY / cellSize);
            let c = Math.floor(P5.mouseX / cellSize);
            let inGrid = (r > -1 && r < gridW && c > -1 && c < gridH);
            if(inGrid){
                if(selector === "B"){
                    grid.setStart(false,[r,c]);
                }
                else if(selector === "C"){
                    grid.setEnd(false,[r,c]);
                }
            }
        }
    
    }


    function clearGrid(){
        grid.clear();
        path = [];
    }

    function makeObstacles(){
        let r = Math.floor(P5.mouseY / cellSize);
        let c = Math.floor(P5.mouseX / cellSize);
        if(r > -1 && r < gridW && c > -1 && c < gridH){
            let node = grid.getGrid()[r][c];
            if(node !== grid.getStart() || node !== grid.getEnd()){
                node.block();
            }
        }  
    }

    function setSelector(value){
        selector = value;
    }

    function run(){
        if(grid.getStart() && grid.getEnd()){
            path = pathfinder.findPath(grid.getStart(), grid.getEnd());
        }
    }


    return (
        <div className="Sketch">
            
            <Panel header={<h2>A* Pathfinding Algorithm</h2>}>
                <P5Wrapper sketch = {sketch}/>
                <RadioGroup name="radioList" inline appearance="picker" defaultValue="A" onChange = {(value) => setSelector(value)}>
                    <Radio value="A">Obstacles</Radio>
                    <Radio value="B">Starting Position</Radio>
                    <Radio value="C">Ending Postition</Radio>
                </RadioGroup>
                <Divider vertical />
                <Button appearance="subtle" onClick={() => clearGrid()}>Clear Grid</Button>
            </Panel>

        </div>
    );
    
};
 
export default AstarSketch;