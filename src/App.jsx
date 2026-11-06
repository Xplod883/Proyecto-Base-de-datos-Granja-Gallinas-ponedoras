
import {Link} from 'react-router-dom';
export default function App(){
const cards=['Producción','Inventarios','Ventas','Finanzas','RRHH','Calidad'];
return <div style={{fontFamily:'Arial',background:'#edf2f7',minHeight:'100vh'}}>
<div style={{background:'linear-gradient(90deg,#4f46e5,#0ea5e9)',padding:30,color:'white'}}>
<h1>Sistema Integral Avícola ERP</h1><p>Diseño empresarial basado en la BD de granja</p></div>
<div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:15,padding:20}}>
{cards.map(c=><div key={c} style={{background:'white',padding:20,borderRadius:12,boxShadow:'0 2px 10px #ccc'}}><h3>{c}</h3><p>Dashboard</p></div>)}
</div>
<div style={{margin:20,background:'white',padding:20,borderRadius:12}}>
<h2>Departamentos</h2>
<ul><li>Producción</li><li>Clasificación de Huevos</li><li>Inventarios</li><li>Compras</li><li>Ventas</li><li>Finanzas</li><li>RRHH</li><li>Sanidad</li><li>Calidad</li><li>Bioseguridad</li></ul>
</div>
</div>
}
