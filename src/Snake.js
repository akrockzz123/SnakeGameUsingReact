import React from 'react'

export default function Snake(props) {
    return (
        <div>
            {props.snakeDots.map((dot,i) => {
                const styles = {
                    left: `${dot[0]}%` ,
                    top : `${dot[1]}%`
                }

                return <div className="snake-dot" key={i} style={styles}></div>
            })}
        </div>
    )
}
