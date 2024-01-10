import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, error, isLoading } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password)
    }

    return (
        <form className='login' onSubmit={handleSubmit}>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <img alt="logo" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAVkAAACDCAMAAAAQ/pgUAAAAw1BMVEX///8AAAD+/v7V1dXr6+uOjo6UlJQbGxuxsbEJCQm/v7/S0tJoaGihoaGXl5etra1gYGDe3t739/c9PT3z8/NRUVHl5eXMzMypqakXFxdtbW0ICAju7u4lJSV0dHTHx8dLS0uBgYGEhIQ6OjpERET/7en9WT3+QCD/t6h5eXkxMTFWVlYpKSm5ubn8OhY0NDT+inP+kX3/iHj9eWr6zsP+19L/MA7+rZr/TjD8knr8lYT/XkH/7+/8r6X+ZEz9urH88unptHVlAAARU0lEQVR4nO1cCbujuLGVCmyM8Qa2sTHGeGGSeJs7M8mb10nmveT//6qotIBYfSdjer50dPrea0BSqXRUKpWE3IQYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBj0AGAgQPCHXRfP4HfV6luAIhGIYJhfEsPrO/DdDwI//vDDT/znz38xxL4BQP7n+5+/L+Hn/zVW+wbUmP3y5fs//d5KfRMA8t2PP/0o8Ne//vi3n/5gmH0P+ASWz1wEgr//8fs/QT6bGfwGQOn3F2SWGD/7dsB3f/ij8QZ9wDDbFwyzfcEw2xcMs33BMNsXDLN94b3MgoqTxV1Lpl8hrzVzl+yuClrT4DPJ1TtZqHwrtIY326xY30FnA/l6r9wH1Y1MKO8eiz1PKMrICqBWrPqkqXYofZZ1b9qmlvvZ+TqVXwBohBYylbb4g8z+420rsJyNzhy1TI22qZFUTQdlGOUU1cDWukvJFRaL29JzyLnSjAGK6tUwKWnLpf3y5eef/+99LxXsjed5m32XsMDDLFaNgRUWlfArzedivVXReAvvg4pk2HPRdmvVgpE91zEs9Qn++JuNV7L5nEZrI7NzBkUbV3kWLMmeWOk40CqCf/7/ly//eJvJkilFzEmr5QDZ8iw0hVLLgIxoATdZjIgmZMCfjvNHtoP396rwOc82fKHlgue6VNQigM8P1dGBWl5ZwiTPR2a8/KjoBNkieipK4e8v//zupd//PASz25rn1JAJNSZV16/0U0jGuRQQzD5zGXbEHxygXI8QMWjVjmf3XVqRJi1vUYgs8rOfK1XMipShYDbPohQ/lGZvgM+4/c+jsNkW10lSZZYhKVutbrNUUSQ7vdlmmXmWndjoEzYLJyl9XdVsofjRnkqLZcwWFc0KZpE5Rey55EhATbo9MNsic6HxprergVk6IyWbHedCFbPKciQ+4Q1glSjpXkWBRW566ik+FsTqNjsrmXwjsSXB7/QG8/YMaixS+qjU2MCs60vtNJvlyJmN07qIDmYZV7Nc+oGUW70onoOarkASq/wsQrNZ1Zmaj+0LL5k9FbzNy9QKWk4hTrwDaVg72fZWZmnka07lFbPI1SWvP7LL5pSPJmG1+eTVzKywWc1ie8YrZoFTlvAJ6FhOErRs5d2a3yWBaHs7s/S2qoroslkyFnL5yBmIRwo5s4pajdhmmy352Hc51BZ0M6tCrqlgalNKFLRMiWhs8OC3crB3MEuPRSDyiRlsgjncdIkfH2qCFCiYVb62ILbZZpUrOJOW1c4b0cksq/qIyXHg82w7opuMYlbG5wPdhLuYpQu1QHrFbB5yZeQk2dEnb41Z4YY0YhuZzS22Evz1ghfMbqSVAfd20V7v6cJm+TNxOxNpzcyu76Jlp3KZLps9SalCkTvRbY0z68oZ9pATG8ctzJaigp55felnJzIZRLQ90L2Txqx22+VnJyBcBhb6nDcQPsZhq2++XoktfFhiNhnJ4TAQdVJnljQy66nA/Cv4WEQ3syE3iCRQVzc9UbdZUJ0go8YWmyW+WIvxbPAJbyDU2+WKXmszmBsUcaFgMHCbmI0XTk6sFN4vupkVBJ1QC+HU9EBft1mQSzVhVO3Myqmeuh7vjRZmi0bziYtPi3suAQOvsp9lIfRGp3YMViOzCudqFX2hm1kxeC1szZNKbnJoUReLIUTrlnIbtJVZ5ewS+xM2K7vrwmk48OsZIVVmQaeWDYZOZmdfg1SOZmblGk80/Ch2jW+S5Rwi9T4dDK4LtQJVXreFWchjCLoMyGtmhYfh2xEgWW6wWdYDilqssZPZbfNueQ9otVmsf62xBWd+cy1yNKxuM9K5BhMWvxN51y9sFpRzj0LxYFmRmTMLudXyjYpubzB8ud/+JrR7AwCPp91EhALC0TmrXKc6s1G+O91qs0WH0R207ciA/BFS1D6h8COL6gzmk5zaMb9sZjafwWZ5Hf2iy88K47qddhzXpNzndWYvYa5zm81yagNhfXQAbTYrvJFc1q2FAlfhGmK/7g1AzKBjcdVis3nUNVM19It2b6B2q6v0tdmsM1OmRrpsFqm1pVseWy3MCinTpvq1Tap8BhP72XPZ5y3MFisFSe3vtwYbNjYMV5giXTCbZMvL8rg4P5Wir/wsziCecIvJwW1jFnFsrN/Jd3SKGSzfRkS0MqtT2/8irDU2UMFADXeVXlmDlfCCWRnDSbQwu2muXznKMrNC7W6bJVWrLf72gNobRjm2oNx4HTLwgn+TWVGHPtIbmQUZwNaRqSw1ZgWstn0D8lWtdiprrb7MJyB2Tx7ZMkcm3KNaYf77zGJt525mgYTczbtLDZlwIqnUsI3ZVpsFyHt0Bl/HZq/paDR6sn8Se+YKeUK01ykX4zORju43MQtyFdDCLKgVxaL0+Kw/+/XMIrUlhyCq6gfN82+qFpO7csVq6fBbbVYPaxujLsascPPjUv1i6aDIfMFsXrL0hjF/rTAU00XPNlvFhuwjeVFEUrlrveibq9PGXn/pZzFc/Wi3WQJiEbGsPBaGLgOvX2uzUA7mZv3uJrYxK7Q55vnkmbdboeTnbFa+XsmZLZrCPKk6hFAvDzLkmlXOOIhoPwm4Veer23LZFmZHRJ38qzmEXtDMrCdDrpFsUA7h6ET0NFdtbxCbn5GR04RYdRy1+ENb7dfPyCgKHbv0WgXUgR1xruHebLNihiiYlbv2o2LGUtQOSEn8e9HMrC20+6hVKybs2Cp2wj7lZ6HqZyXad2TEyvpaey5IEYFXszdo25HRt5b7t1oge89qAIQp+7sJK6dmGXzMn9qYsPLYtdd0jJGN/g3L5q2ImiXAwrzynEdhgxDi4/pZRBaa5ALKzwMuaBNwb4KXVlDtfZElLM6n7rmiJVk+irfSVEp9P9rOMeWMVtKVsvKsr364tlpeOlhSzMBAtId59d36kap8qCZALRRXWWrnrUHPIhN7nMLauSGkYf1Q2h0gzWVJ0XJ1KqjOql5Li4wG1UATra6q3ZOvATSKqyak6dMft40H0lszV9R53elQ+qgnNiZAwVs9g7Z2qi2j6tIaE0si+jXb5qdQbRroad3Fi8Gq3zfYYKdKLbzrHVY2RSg/rthpi5Qe0DUYG4glGt9lGS2i2wzuVfHPDFboTIe6ot22/V50yK/NFOq+bg6tdlWUaK+rs4lNnqRzvJMqnS8Y/DqOoMs4mtvWYBZdNRUMdxSE0sQFld8mk6/T3yC75ptLz3sCVPu4Zm5NVqfIKWgAUr7XZDfpD01Uga5BqWzj7COkVPSqie3w2bXib0PpO1NVBwBVKpu1LJtw21jMw68WJwJlBZQ4yPWoUwaKGS361qtpdsS6sP5sllVgj4NSrKcIDNJ9ZdCqi1AsmWz+ohb8YgEV+LXlUNEfTJC/59dQt3UG/zCVfMiaS6wAPrZVpUWa0IVdeYPBBvJpK/BXRTcU3qRxdNa5fwvwlX5pryj3hlY8BmgiltzEijxbchpcdaYWN1HS2spCK4dZg7mft7BkN2EkTsACrukHGqF5eYtuAbJbzhJPP65F8oQmDj2q783BRhzwBrUWLDOqWX+z734DgDMLha5Fkyx3XBqMeQG4iS39jO/SruJJXs4/hErzsqOU8ndbEopToEXb1LAYunvlKe78O3XKQ+Uj3Yq3LJvaFpNPsyP/nOG+0LY4qBgu8q/h5L1Ycsz5uGld3/92DKnaJtmPPVGRnwZEMAvgjW2uXbARR1E8j1xqNgvgiy0SWHF9A+YVUAjX2reZxLEvCLTiIUvljQlkuvjO6BlPkoqtm+QUpWK4oFRkIUxXePh7Lr3nKhUqWxuyFju+WcKNAR/7qa2iC6VCkIrDHn66Km5ZU7BpvTla3LuUu3DD2IlvIRktdw5u/yGzJLy5Dm5iTg7HGLflVhfqLm47ySz+RWan66tLHZ94y9UAze2Z7MmRuu6IhJfpkR7Iwb3hBuJya0XUcZ6njLVn9OBbr14Sx4mHr4bcszCsQ0ISHBWD9YFJtcj4eHBo/GTMMps9sJSt69I74Mse9/4hziId8KUO/zehLh0S/8bMgqXHc7LKDhk/2hkIlciIFV8HJMjcB732xivJbZY5SaZQnJE5fVj2zSWhy5TNoj05UWam9BQM6JwN1DSYyHclBbNDuvQ9mpGNG27wDVr2YK32YEGDlUsX42DLJDxPBNwr2cbXDatiQ8iRe8xV9BGGH1GwmkQjX7iDaEeuboB77JlvRQ+mWLKxLzGx3TkrdSEb5pDH7HdHn8GBil62HzQ5oQO4Mgd7ohubPlFXpkJIGNOwYzWu+b1tMwvZ0AVMWB0zvjHcE7vKZsHCF3CHiDXbw+PD1h5t9skcp0235IE7zdGBxHhG2VHeoGA2BCxqRRZJJmTvbgH93sqdEjzfBicqwggmwEbDg2jBLqZitrLYKGZ9Nk2k+3vGPgnRpV6x1IwC7ywvtlbI7D0jCxz5V4c4SOpjLYgJhjf+zixC3S7nFSuDMgJ3RnCs7dnsh/vrQTI+J6zE1SXriChae6J2SKULDNfLu3shU3ePs7xglgw/1hc20m6MUYiuJMbXG+hn0bdlgtkJOeGXG0/ILBvWLpPAJqqP9THD5sxZ1v2FOlnKmQ3jqejAqctfZc1cG1/ITsnQCUQjJ3S3O+A5nIPDbqcujB2WxXcEs+slWdD7cR09wGFDB9Zr0Foy4QoSjCM2q/iyPh7ZhOlOcWiMCIYWBN3F+nh3IvzOTnKXjrDXGYyZaTabfzyYF9uja/A4s0d6np7YyLqhA0Bmh0yLjwlXZim+Fc+shJkBM7GIeIxZj6aLNfu7mw5mo8Cm/BQbjK8Jc93ILDdVK07vdz6p6MxycSvHyW7LJLIZs6zB07jCLLNZdzoYTC0SoU7rI5e/4jP/LiLumftqxuweVRiOgoDpzIYPMsvVZsWHgymLfVfzXeyGvc1gwJgVr1uOaHgLRzhB5g1sd0N8fjYdmcV4hjGLLlZEsPiiKuSR47TELFkuHyNWUHwtzKdzFe04d2TWj0dY6fqWiNe/WzzKhN5AMTvlHR2yafNKbZxWmVNM8ctT/p7NYuS+JPdEhEnRTkjl2c/4cU+EN8iGzBsAnu5mN/t4CIJZ9Aa39JQUS5Sw17e3Q3qYDQYni01QqyH9IE/62PiJQ1Z04YVRZnsX+oQEvyIYT5gNj/y1fO0XunQ2PuN3CK44bpnr8twNnu65oaugz3AXBTZn+PpI7SHjmHXJ3l0/PXyxeBMuaOXeLOvGIq6BK9Zvjwv/uERsAlhaKZtSNzRJrQdTKF6nsL6wXl+E4+jEhvU0vMv3iHe6SNM1q+xAp/uDmMHWdGTv3BVgbLNnXuFIn/ad7n16D1PWx+vM2k/4EbV+4lk2YziJkyTMGCc0Ok4mZOuwqIsFO2xuTpjnjJ3DcUTurN8hG6DHjK8TGa37+OW7OzO1KU4jw4z4mY/T9Bnn/IyFOGdif6CzTm9u5A7QlvjJ0RnzvKx3xBphk1B6Y8XmfAEF4U0Y+zwJBs7EpZc9eT5QIQ/XNOwhW5dM45gFI2z9Rd3dTp7pOLssbMOiExozQ/Q/Uggw6jqT4LJlIWw2wqgrdvGkZ8xqtFg7XTd6ShL6gLYCCS0cuVN3FVj84X6Fb0pFNJ2vYfxQU2Xvr3QxoMRh3tBa5WscYnt7NQ0HbOFAxrGXr898X1u5B4FsKgCLa0P0DCPH5gqx7pLfoAws4R55slrOCTHAqgqUNqH2/9YIlXjvseJiHWIFfRlsA3ChWDsZ8W6ko+j4WpOd9A/z+lGN/0w8L+3/E9GbsKPZikDXKMSUYSbSx1nvCn0FqC2SfoEO4TMHDfKNlK80YHtHn+2QXQevO1Dr5G+F2H4B2tVrs/0KA+i/DFD6+GbY7bEd0HD1skifp4e/TXQSZtg0MDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMPim8C/KyO1k1IuehQAAAABJRU5ErkJggg=="></img>
            </div>
            <h3>Kirjaudu</h3>

            <label>Sähköposti</label>
            <input 
                type='email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <label>Salasana</label>
            <input 
                type='password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />

            <button disabled={isLoading}>Kirjaudu sisään</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}

export default Login