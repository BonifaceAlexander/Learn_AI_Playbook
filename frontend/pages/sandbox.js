import { useEffect, useState } from 'react'
import axios from 'axios'
export default function Sandbox() {
  const [prompt, setPrompt] = useState('Give a short guide on how to use Learn AI Playbook.')
  const [output, setOutput] = useState('')
  const [apiKey, setApiKey] = useState('')
  const [loading, setLoading] = useState(false)
  useEffect(()=> {
    const k = localStorage.getItem('lap_api_key')
    if(k) setApiKey(k)
  },[])
  function saveKey(){ localStorage.setItem('lap_api_key', apiKey); alert('Saved in browser (localStorage)') }
  function clearKey(){ localStorage.removeItem('lap_api_key'); setApiKey(''); alert('Cleared') }
  async function runPrompt(){
    setLoading(true); setOutput('')
    try{
      if(apiKey){
        const resp = await fetch('https://api.openai.com/v1/chat/completions', {
          method:'POST', headers:{'Content-Type':'application/json','Authorization':`Bearer ${apiKey}`},
          body: JSON.stringify({model:'gpt-4o-mini', messages:[{role:'user', content: prompt}], max_tokens:300})
        })
        const data = await resp.json()
        setOutput(JSON.stringify(data, null, 2))
      } else {
        const resp = await axios.post('/api/mock', { prompt })
        setOutput(resp.data.output)
      }
    } catch(e){
      setOutput('Error: '+ (e.message || e))
    } finally { setLoading(false) }
  }
  return (
    <div className="container">
      <h1>Sandbox</h1>
      <p>Try prompts with a saved API key (client-side) or use the mock demo.</p>
      <textarea rows={6} cols={80} value={prompt} onChange={e=>setPrompt(e.target.value)} />
      <div style={{marginTop:12}}>
        <input placeholder="Paste your API key (optional)" style={{width:420}} value={apiKey} onChange={e=>setApiKey(e.target.value)} />
        <button onClick={saveKey} style={{marginLeft:8}}>Save</button>
        <button onClick={clearKey} style={{marginLeft:8}}>Clear</button>
      </div>
      <div style={{marginTop:12}}>
        <button onClick={runPrompt} disabled={loading}>{loading ? 'Running…' : 'Run'}</button>
      </div>
      <pre style={{background:'#f6f8fa', padding:12, marginTop:16, minHeight:140}}>{output}</pre>
    </div>
  )
}
