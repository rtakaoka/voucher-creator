import { useEffect, useState } from 'react'
import takaLogo from '/taka.svg'
import voucherTemplate from '/voucher-template.png'
import './App.css'

function App() {
  const [fullName, setfullName] = useState('')
  const [expirationDate, setExpirationDate] = useState('')
  const [voucherValue, setVoucherValue] = useState('')
  const [voucherId, setVoucherId] = useState('')
  const [isVoucherCreated, setIsVoucherCreated] = useState(false)

  let canvas: HTMLCanvasElement | null
  let ctx: CanvasRenderingContext2D | null
  let imageObject = new Image()
  imageObject.src = voucherTemplate

  useEffect(() => {
    canvas = document.getElementById('voucher-canvas') as HTMLCanvasElement | null
    if (canvas !== null) {
      ctx = canvas?.getContext('2d')
      canvas.width = 1080;
      canvas.height = 1080;

      if (ctx) {
        ctx.drawImage(imageObject, 0, 0, 1080, 1080)
        ctx.textAlign = 'left'
        ctx.textBaseline = 'top'
        ctx.direction = 'ltr'

        ctx.fillStyle = '#333'
        ctx.font = '60px helvetica'
        ctx.fillText(`R$ ${voucherValue}`, 260, 638)

        ctx.fillStyle = '#555'
        ctx.font = '24px helvetica'
        ctx.fillText(`Para: ${fullName}`, 540, 620)

        ctx.fillStyle = '#555'
        ctx.font = '24px helvetica'
        ctx.fillText(`Válido até: ${expirationDate}`, 540, 660)

        ctx.fillStyle = '#555'
        ctx.font = '16px helvetica'
        ctx.textAlign = 'center'
        ctx.fillText(`ID do Voucher: ${voucherId}`, 540, 1040)
      }
    }

  }, [fullName, expirationDate, voucherValue, voucherId])

  const createVoucher = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const id = crypto.randomUUID()
    setVoucherId(id)
    setIsVoucherCreated(true)

    return
  }

  return (
    <>
      <div>
        <a href="https://github.com/rtakaoka" target="_blank">
          <img src={takaLogo} className="logo" alt="Taka logo" width={30} />
        </a>
      </div>
      <h1>Gerador de Voucher</h1>
      {!isVoucherCreated ? (
        <form onSubmit={createVoucher}>
          <label htmlFor="full-name">Nome e sobrenome</label>
          <input type="text" id="full-name" value={fullName} onChange={e => setfullName(e.target.value)} />
          <br />

          <label htmlFor="voucher-value">Valor</label>
          <input type="number" min={0} max={500} id="voucher-value" value={voucherValue} onChange={e => setVoucherValue(e.target.value)} />
          <br />

          <label htmlFor="expiration-date">Validade</label>
          <input type="date" id="expiration-date" value={expirationDate} onChange={e => setExpirationDate(e.target.value)} />
          <br />

          <button>Gerar Voucher</button>
        </form>
      ) : (
        <div id="voucher-wrapper">
          <canvas id='voucher-canvas'></canvas>
        </div>
      )}
    </>
  )
}

export default App
