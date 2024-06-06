import Image from 'next/image';
import hexagon from '../public/hexagon.png'

const Hex = ({ rowStart, columnStart }) => {
    const hexStyles = {
        gridColumnStart: columnStart,
        gridRowStart: rowStart,
        gridColumnEnd: `span 4`,
        gridRowEnd: `span 2`,
    }
    return (
        <div style={hexStyles}>
            <Image src={hexagon} width={140} height={120.06} alt="An image of one hexagon, tileable." />
        </div>
    )
}

export default Hex;