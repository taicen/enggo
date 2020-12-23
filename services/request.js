let client

export function setClient(newClient){
  client = newClient
}

const reqMethods = [
  'request',
  'delete',
  'get',
  'post',
  'put',
  'head',
  'options'
]

let service = {}

reqMethods.forEach(method => {
  service[method] = function(){
    if(!client) throw new Error('Axios not installs')
    return client[method].apply(null, arguments)
  }
})

export default service