import React, {useState } from 'react';

const IMP_API = "https://www.themoviedb.org/t/p/w220_and_h330_face"

const Movies = ({ id, title, poster_path}) => {
    const [price, setPrice] = useState(0);
    const [showPrice, setShowPrice] = useState(0);
    // const [myCart, setmyCart] = useState({
    //     id: 0,
    //     price: 0
    // });
    const storageCart = localStorage.getItem('Cart');
    const objectsCart2 = JSON.parse(storageCart)
    

function handlerOnChange(e) {
    setPrice(e.target.value);
    
}

function handlerOnSubmit(){
    setShowPrice(price)
}

function handlerOnCart(){
    if (id === 0 || price === 0) {
        return
    }

    let addCart = objectsCart2??[] ;
    
    addCart.push({
        id: id,
        title:title,
        poster_path : poster_path,
        price: price
    })
    localStorage.setItem('Cart', JSON.stringify(addCart));

    window.location.reload();    
}
    
    return (
         <div className="show-movies">
            <img src={IMP_API+poster_path} alt={title} />
            <div className="text-title">{title}</div>
            <div className="price_group">
                <input type = "number" placeholder = "ใส่ราคาหนัง" onChange={handlerOnChange} style={{width: '117px'}}></input>
                <button onClick={handlerOnSubmit}>เพิ่มราคาหนัง</button>
                <div style={{textAlign: 'center', fontSize: '24px', fontWeight: 'bold'}}>{showPrice}  ฿</div>
            </div>
            <button style={{height: '70px', borderRadius: '5px'}} onClick={handlerOnCart}>เพิ่มไปที่ตะกร้า</button>
         </div>
    )
   
};
export default Movies;