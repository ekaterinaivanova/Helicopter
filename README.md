# Helicopter
BE homework
### Prerequisites
docker
### How to start
npm run build

npm run dev

##Usage
### Endpoints

- GET, POST `http://localhost:80/api/helicopters`
- GET, PUT, DELETE `http://localhost:80/api/helicopters/:id`

#### Post

```javascript
{
  name, //required, string
  description,//string
  year, // number
  numberOfBlades, //number
  color, //string
  isAvailable, //required
  class //ID FK to helicopter-class
}
```
####LIST
Example: http://localhost/api/helicopters?isAvailable=true&populate=class&select=name
