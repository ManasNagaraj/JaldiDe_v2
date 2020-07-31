import React, { Component } from 'react';
import {TaggedContentCard} from 'react-ui-cards';

export default class Shops extends Component {
// export default function Shops(props) {
    render() {
        //console.log(this.props.shops[0])
        return (
            <div>
                <div className='card-container'>
                {

                    this.props.shops.map((shop) => {
                    return(
                        <div key={shop._id}>
                        <TaggedContentCard
                        float= "false"
                        href={'/shop/'+ shop._id}
                        thumbnail={shop.image}
                        title={shop.name}
                        description={shop.description}
                        tags={shop.category}
                        />
                        </div>
                    )})
                }
                </div>                
            </div>
        )
    }
}
