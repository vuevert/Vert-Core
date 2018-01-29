import { createServer } from 'http'
import { Http } from './srv.http'

const PORT = 20000
const HOST = '127.0.0.1'

const mockingData = {
  '/api/v1/username': {
    type: 'application/json',
    status: 200,
    data: 'LancerComet',
    message: 'OK'
  }
}

let httpServer = null

describe('Http service test.', () => {
  let http: Http

  beforeAll(() => {
    createHttpServer()
  })

  beforeEach(() => {
    http = new Http()
    http.addRequestInterceptor(config => {
      config.baseURL = `http://${HOST}:${PORT}`

      if (config.method === 'post') {
        config.withCredentials = true
      }

      return config
    })
  })

  afterAll(() => {
    httpServer.close()
  })

  it('Get request.', async () => {
    expect.assertions(1)
    const path = '/api/v1/username'
    try {
      const { data } = await http.get(path)
      expect(data).toMatchObject(mockingData[path])
    } catch (error) {
      console.error(error.message)
    }
  })

  it('Post request.', async () => {
    expect.assertions(1)
    const path = '/api/v1/username'
    try {
      const { data } = await http.post(path)
      expect(data).toMatchObject(mockingData[path])
    } catch (error) {
      console.error(error.message)
    }
  })

  it('Throws error when using withCredentials.', async () => {
    expect.assertions(1)
    const path = '/api/v1/username'
    try {
      const { data } = await http.get(path, {
        withCredentials: true
      })
    } catch (error) {
      expect(error.message).toEqual('Network Error')  // Credentials forbidden
    }
  })
})

function createHttpServer () {
  httpServer = createServer((req, res) => {
    const { url, method } = req

    if (method === 'POST') {
      res.setHeader('Access-Control-Allow-Credentials', 'true')
    }

    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With')
    res.setHeader('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS')

    const data = mockingData[url]
    if (data) {
      res.writeHead(data.status, { 'Content-Type': data.type })
      res.end(JSON.stringify(data))
    } else {
      res.writeHead(404, { 'Content-Type': 'text/html' })
      res.end('<h1>Not found</h1>')
    }
  })

  httpServer.listen(PORT, HOST, (error) => {
    if (error) {
      console.error(error)
      process.exit(1)
    }
    console.log('[Info] Mocking server is on.')
  })
}
