import express, { Request, Response } from "express"

const app = express()
const PORT = 3000

app.use(express.json())

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Express + TypeScript")
})

app.post("/data", (req: Request, res: Response) => {
  const data = req.body

  res.json({
    message: "Data received",
    yourData: data
  })
})


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})