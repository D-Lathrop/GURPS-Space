import Hex from "./hex.js"

const BattleMap = () => {
    let mapWidth = 30
    let mapHeight = 30
    let tileNumber = mapWidth * mapHeight
    let gridHeight = mapHeight + 1
    let gridWidth = (mapWidth * 2) + 3
    let tileArray = []

    const battlemapStyles = {
        position: 'fixed',
        top: 0,
        left: 0,
        overflowY: 'scroll',
        overflowX: 'scroll',
        width: '75vw',
        height: '100vh',
        display: 'grid',
        gridTemplateRows: `repeat(${gridHeight}, 60px)`,
        gridTemplateColumns: `repeat(${gridWidth}, 35px)`,
    };

    function generateHexArray() {
        let rowStartNum = 1
        let columnStartNum = 1

        for (let i = 1; i < tileNumber + 1; i++) {

            if (i % mapWidth === 1 && i !== 1) {
                rowStartNum++
                if (rowStartNum % 2 === 0) {
                    columnStartNum = 2
                } else {
                    columnStartNum = 1
                }
            }

            let newTile =
            {
                id: i,
                columnStart: columnStartNum,
                rowStart: rowStartNum
            }

            tileArray.push(newTile);

            columnStartNum += 2
        }
    }

    generateHexArray();

    return (
        <div style={battlemapStyles}>
            {
                tileArray.map((tile, index) => (
                    <Hex key={index} columnStart={tile.columnStart} rowStart={tile.rowStart} />
                ))
            }
        </div>
    )
}

export default BattleMap;
