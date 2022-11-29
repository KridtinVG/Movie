import React, { useEffect, useState } from 'react';

const Cart = () => {
    const storageCart = localStorage.getItem('Cart');
    const storageMovies = localStorage.getItem('DataStore');
    const objectsMovies = JSON.parse(storageMovies)
    const objectsCart = JSON.parse(storageCart)
    const [myCartlist, setmyCartlist] = useState([])

    useEffect(() => {

        getMoviedata()
    }, [])

    function getMoviedata() {
        objectsMovies.map((movie) => {
            objectsCart.map((cartItem) => {
                if (movie.id === cartItem.id) {
                    console.log(movie.title)
                    setmyCartlist([...myCartlist, {
                        title: movie.title,
                        path: movie.poster_path,
                        price: cartItem.price
                    }])
                }

            })
        })
    }

    return (
        <div>
            <div className='headerText'>My Cart</div>
            <div className="cart-container">
                {myCartlist.map((cartItem) => {
                    return (
                        <div>
                            {cartItem.title}
                            {cartItem.price}฿
                        </div>
                    )
                })}
            </div>
            <div></div>
        </div>
    )
}

export default Cart