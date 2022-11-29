import './App.css';
import React, { useState, useEffect } from 'react';
import Movies from './components/main'
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Form, Button, Modal} from 'react-bootstrap';
// import PayModal from './components/PayModal'

const IMP_API = "https://www.themoviedb.org/t/p/w220_and_h330_face"
const Movie_Api = "https://api.themoviedb.org/3/search/movie?api_key=4cf1008f7c0e7182509bdfdcb4af8a5e&query=a";

function App() {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false)
    setSeconds(-1)
  };
  const handleShow = () => {    
    setShow(true);
    setSeconds(60);
  };
     

  const [NewMovie_Api, setNewMovie_Api] = useState(Movie_Api);
  const [movies, setMovie] = useState([])
  const [searchText, setSearchText] = useState('')
  const storageCart = localStorage.getItem('Cart');
  const storageMovies = localStorage.getItem('DataStore');
  const objectsMovies = JSON.parse(storageMovies)
  const objectsCart = JSON.parse(storageCart)
  const [myCartlist, setmyCartlist] = useState([{}])
  // const countdownInterval = useRef();


  useEffect(() => {
    fetch(NewMovie_Api)
      .then((res) => res.json())
      .then((data) => {
        setMovie(data.results)
      });
  }, [NewMovie_Api]);
  //----------------------------------------------------
  useEffect(() => {
    getMoviedata()
  }, [])

  const [seconds, setSeconds ] =  useState();
    useEffect(()=>{
   let myInterval = setInterval(async() => {  
         
            if (seconds > 0 || seconds ===60) {
                    
                setSeconds(await seconds - 1);
            }if (seconds === 0) {
              clearInterval(myInterval);
              handleClose()
            }
            
        }, 1000)
      },[seconds])
      
  function getMoviedata() {
    objectsMovies.map((movie) => {
      objectsCart.map((cartItem) => {
        myCartlist.map((cartList) => {
          if (movie.id === cartItem.id && cartItem.id !== cartList.id) {
            console.log(movie.title)

            setmyCartlist([...myCartlist, {
              id: movie.id,
              title: movie.title,
              path: movie.poster_path,
              price: cartItem.price
            }])

          }
        })
      })
    })
  }
  //----------------------------------------------------
  localStorage.setItem('DataStore', JSON.stringify(movies));

  const handlerOnSubmit = (e) => {
    e.preventDefault();
    console.log(Movie_Api + '+' + searchText)
    setNewMovie_Api(Movie_Api + '+' + searchText)

  }

  const handlerOnChange = (e) => {
    setSearchText(e.target.value);
  }

  const hanlerClartbnt = () => {
    localStorage.setItem('Cart', JSON.stringify([]))
    window.location.reload();
  }


  function promotion() {

    const sumTotal = objectsCart.reduce(
      (previousValue, currentValue) => previousValue + parseInt(currentValue.price), 0
    );
    if (objectsCart.length <= 3) {
      return "รวมยอดชำระ ส่วนลด 0%" + "       " + sumTotal + "฿"
    } else if (objectsCart.length <= 5) {
      return "รวมยอดชำระ ส่วนลด 10%" + "       " + sumTotal * 0.9 + "฿"
    } return "รวมยอดชำระ ส่วนลด 20%" + "       " + sumTotal * 0.8 + "฿"
  }


  return (

    <div style={{ backgroundColor: '#22254b' }}>
      <div>
      <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>โปรดชำระเงิน</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Label htmlFor="count">หน้าต่างนี้จะปิดใน{seconds} วินาที</Form.Label>
            <h1>1654-5577-9999-24  BK_Bank</h1>
            
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Enter
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      <form onSubmit={handlerOnSubmit}
      >
        <div className="input-group"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <div id="search-autocomplete" className="form-outline">
            <input type="search"
              id="form1"
              className="form-control"
              style={{
                textAlign: 'center',
                width: '500px',
              }}
              onChange={handlerOnChange}
              placeholder="Search..."
            />
          </div>
          {/* <Button type="button" class="btn btn-primary" style={{height: '39px'}}>
                Search
            </Button> */}
        </div>
      </form>

      <div className='main-container'>

        <div className="movie-container">
          {movies.length > 0 && movies.map((movie) =>
            <Movies key={movie.id} {...movie} />
          )}

        </div>

        {/* <Cart/> */}
        <div>
          <div className='headerText'>My Cart</div>
          <div className="cart-container">
            {objectsCart != null ? objectsCart.map((showItem) => {
              return (
                <div style={{
                  display: 'grid',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '1rem',
                  border: '1rem solid #4f6083'
                }}>
                  <img src={IMP_API + showItem.poster_path} alt={objectsCart.title} />
                  <div>{showItem.title}</div>
                  <h3 style={{ textAlign: 'right' }}>{showItem.price}฿</h3>
                </div>

              )
            }) : ""}
          </div>

          <div style={{ textAlign: 'center', fontSize: '24px', fontFamily: 'Lucida Calligraphy' }}>
            {objectsCart != null ? promotion() : ""}
          </div>

          <button
            style={{
              height: '50px',
              width: '150px',
              backgroundColor: '#fff'
            }}
            onClick={hanlerClartbnt}
          >Clear All Storage</button>

          <button
            style={{
              height: '50px',
              width: '150px',
              backgroundColor: '#a3ffc8'
            }}
            onClick={handleShow}
          >สั่งสินค้า</button>
        </div>

      </div>
    </div>
  );
}

export default App;
