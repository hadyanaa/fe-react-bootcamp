import React from 'react';
import { useState, useEffect} from 'react';
import { Button, Row, Card} from "antd"
import { useNavigate } from "react-router-dom"

const Transaction = () => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const navigate = useNavigate()

  // let times = new Date()
  const deadline = "December, 7, 2022";

  const getTime = () => {
    const time = Date.parse(deadline) - Date.now();

    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  useEffect(() => {
    const interval = setInterval(() => getTime(deadline), 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
    <div className="transaksi">
        <h2>Selesaikan pembayaran dalam</h2>
        <h2>{days} : {hours} : {minutes} : {seconds}</h2>
        <p>Batas akhir pembayaran</p>
        <h2>{deadline}</h2>
    </div>

    <div className='content-transaksi'>
            <Row>
                <Card className="card-transaksi">
                    <h3 style= {{marginLeft: "15px", marginTop: "5px"}}>Wallet</h3>
                    <hr style={{margin: "10px"}}/>
                    <h3 style= {{marginLeft: "15px", marginTop: "5px"}}>Nomor Virtual Account</h3>
                    <p></p>
                    <h3 style= {{marginLeft: "15px", marginTop: "5px"}}>Total Pembayaran</h3>
                </Card>
            </Row>
    </div>


    <div>
        <Button className='btn-1'>Cek Status Pembayaran</Button>
        <Button className='btn-2' onClick={()=>{
          navigate(`/product`)
          }}>Belanja Lagi</Button>
    </div>
    </>      
  )
}

export default Transaction;