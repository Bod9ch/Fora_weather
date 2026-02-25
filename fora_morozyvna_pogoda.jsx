import { useState } from "react";

/* ═══════════════════════════════════════════════════════════
   FORA × МОРОЗИВНА ПОГОДА — Landing Page
   Brand: Taktika rebrand 2023-2024
   Colors: green #00B15E, red #E5412E, yellow #FFC42E, 
           purple #7B61FF, blue #00AEEF, dark #1D3A2C
   Elements: geometric plashky, sticker badges, rounded shapes
   ═══════════════════════════════════════════════════════════ */

const C = {
  green: "#00B15E",
  greenDark: "#0D6E3B",
  red: "#E5412E",
  redSoft: "#FF6B55",
  yellow: "#FFC42E",
  blue: "#00AEEF",
  purple: "#7B61FF",
  cream: "#FFFDF5",
  white: "#FFFFFF",
  gray: "#F0EFEB",
  dark: "#1D3A2C",
  muted: "#7A8A7E",
};

const TIERS = [
  { min: 20, max: 24, pct: 5,  label: "Прохолодно", emoji: "🌿", color: C.green },
  { min: 25, max: 27, pct: 10, label: "Тепленько",   emoji: "☀️", color: C.blue },
  { min: 28, max: 30, pct: 15, label: "Спекотно",    emoji: "🔥", color: C.yellow },
  { min: 31, max: 33, pct: 20, label: "Пече!",       emoji: "🌶️", color: "#FF8C00" },
  { min: 34, max: 36, pct: 25, label: "Пекло!",      emoji: "🥵", color: C.redSoft },
  { min: 37, max: 42, pct: 30, label: "Плавимось!",  emoji: "🌋", color: C.red },
];

function getTier(t) {
  for (let i = TIERS.length - 1; i >= 0; i--) if (t >= TIERS[i].min) return { ...TIERS[i], idx: i };
  return { ...TIERS[0], idx: 0 };
}

/* ── Fora Logo (from uploaded SVG) ── */
function Logo({ w = 150 }) {
  return (
    <svg width={w} height={w/3} viewBox="0 0 150 50" fill="none">
      <path d="M9.654 46.974H94.031c4.77 0 8.654-3.884 8.654-8.654V11.68C102.685 6.91 98.801 3.026 94.031 3.026H9.654C4.884 3.026 1 6.91 1 11.68v26.64c-.026 4.77 3.858 8.654 8.654 8.654Z" fill="#00B15E"/>
      <path d="M48.467 16.659h-.104c-2.06 0-3.832.677-5.292 2.007-1.46 1.329-2.19 2.972-2.19 4.848v2.868c0 1.876.73 3.519 2.19 4.848 1.46 1.33 3.233 2.007 5.292 2.007h.104c2.06 0 3.832-.677 5.292-2.007 1.46-1.329 2.19-2.972 2.19-4.848v-2.868c0-1.876-.73-3.519-2.19-4.848-1.434-1.356-3.232-2.007-5.292-2.007Zm0 12.512h-.104c-.86 0-1.564-.261-2.163-.808-.6-.548-.887-1.199-.887-1.981v-2.868c0-.782.287-1.434.887-1.981.6-.548 1.303-.808 2.163-.808h.104c.835 0 1.538.26 2.138.808.6.548.913 1.199.913 1.981v2.868c0 .782-.287 1.434-.913 1.981-.6.548-1.277.808-2.138.808Z" fill="#fff"/>
      <path d="M37.337 18.666c-1.408-1.329-3.128-2.007-5.11-2.007h-.103c-1.121 0-2.19.235-3.18.704-.365-.652-1.069-1.121-1.877-1.121-.808 0-1.512.443-1.877 1.12a8.173 8.173 0 0 0-3.18-.703h-.13c-1.982 0-3.676.677-5.084 2.007-1.407 1.33-2.111 2.972-2.111 4.848v2.868c0 1.877.704 3.519 2.111 4.849 1.408 1.329 3.128 2.007 5.084 2.007h.104c1.043 0 2.007-.209 2.945-.6v2.66c0 .547.209 1.042.626 1.46.417.39.938.599 1.512.599.521 0 .99-.156 1.408-.495.39-.313.625-.73.703-1.2V32.665a8.06 8.06 0 0 0 2.945.6h.104c1.982 0 3.702-.679 5.11-2.008 1.407-1.33 2.111-2.972 2.111-4.849v-2.867c.026-1.903-.704-3.545-2.111-4.874Zm-12.382 7.716c0 .782-.287 1.434-.886 1.981-.574.548-1.251.808-2.06.808h-.13c-.808 0-1.486-.26-2.085-.808-.574-.547-.86-1.2-.86-1.981v-2.868c0-.782.286-1.434.86-1.981.573-.548 1.251-.808 2.086-.808h.104c.808 0 1.486.26 2.06.834.573.548.86 1.2.86 1.981v2.842h.052Zm10.244 0c0 .782-.287 1.434-.86 1.981-.574.548-1.252.808-2.086.808h-.104c-.808 0-1.486-.26-2.06-.808-.573-.547-.86-1.2-.86-1.981v-2.868c0-.782.287-1.434.86-1.981.574-.548 1.252-.808 2.06-.808h.104c.808 0 1.512.26 2.086.808.573.548.86 1.2.86 1.981v2.868Z" fill="#fff"/>
      <path d="M70.233 18.666c-1.46-1.329-3.258-2.007-5.318-2.007h-.104c-1.226 0-2.398.261-3.467.756-.365-.704-1.069-1.173-1.903-1.173-1.173 0-2.138.964-2.138 2.137v.287 1.355 15.301c0 .548.209 1.043.652 1.46.417.365.964.574 1.564.574.6 0 1.121-.209 1.59-.6.417-.391.626-.886.626-1.434V32.638a8.172 8.172 0 0 0 2.945.6h.104c2.06 0 3.858-.678 5.318-2.008 1.46-1.329 2.19-2.971 2.19-4.848v-2.868c.052-1.876-.704-3.518-2.06-4.848Zm-2.241 7.69c0 .782-.287 1.434-.913 1.981-.6.548-1.303.808-2.138.808h-.104c-.86 0-1.564-.26-2.163-.808-.6-.548-.887-1.2-.887-1.981v-2.868c0-.782.287-1.433.887-1.98.6-.548 1.303-.809 2.163-.809h.104c.835 0 1.538.261 2.164.835.6.547.913 1.199.913 1.98v2.843h-.026Z" fill="#fff"/>
      <path d="M127.5 47c12.15 0 22-9.85 22-22s-9.85-22-22-22-22 9.85-22 22 9.85 22 22 22Z" fill="#E5412E"/>
      <path d="M137.978 20.178a2.208 2.208 0 0 0-1.564-.756h-1.668l-4.144-4.9a1.107 1.107 0 0 0-1.669-.131c-.234.209-.391.496-.417.808a1.1 1.1 0 0 0 .287.86l2.867 3.39h-8.367l2.867-3.39c.209-.234.313-.547.287-.86a1.126 1.126 0 0 0-.417-.808 1.126 1.126 0 0 0-.86-.287 1.126 1.126 0 0 0-.808.417l-4.145 4.901h-1.668c-.6 0-1.173.287-1.564.756-.391.47-.521 1.095-.365 1.694l2.32 9.827c.208.913 1.016 1.538 1.929 1.538h13.215c.913 0 1.721-.625 1.929-1.538l2.32-9.827c.157-.6.026-1.225-.365-1.694Zm-13.372 9.201c0 .496-.391.887-.886.887h-.156c-.496 0-.887-.391-.887-.887V23.28c0-.495.391-.886.887-.886h.156c.495 0 .886.391.886.886v6.1Zm3.832 0c0 .496-.391.887-.886.887h-.157c-.495 0-.886-.391-.886-.887V23.28c0-.495.391-.886.886-.886h.157c.495 0 .886.391.886.886v6.1Zm3.858 0c0 .496-.391.887-.886.887h-.157c-.495 0-.886-.391-.886-.887V23.28c0-.495.391-.886.886-.886h.157c.495 0 .886.391.886.886v6.1Z" fill="#fff"/>
      <path d="M86.785 16.398c-.782 0-1.46.417-1.825 1.017v.026a8.26 8.26 0 0 0-3.493-.782h-.104c-2.06 0-3.832.677-5.292 2.007-1.46 1.33-2.19 2.972-2.19 4.848v2.868c0 1.877.73 3.519 2.19 4.849 1.46 1.329 3.233 2.007 5.292 2.007h.104c1.252 0 2.424-.261 3.493-.782.391.626 1.069 1.043 1.851 1.043 1.2 0 2.164-.965 2.164-2.164V19.135v-.47-.104c0-1.199-.964-2.163-2.164-2.163h-.026Zm-2.268 9.983c0 .782-.286 1.434-.912 1.981-.6.548-1.304.808-2.138.808h-.104c-.86 0-1.564-.26-2.164-.808-.6-.548-.886-1.2-.886-1.981v-2.868c0-.782.286-1.434.886-1.981.6-.548 1.304-.808 2.164-.808h.104c.834 0 1.538.26 2.164.808.6.548.912 1.2.912 1.981v2.868h-.026Z" fill="#fff"/>
    </svg>
  );
}

/* ── Sticker badge ── */
function Stk({ children, bg = C.red, color = C.white, rotate = 0, sz = 13, style = {} }) {
  return <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:bg, color, fontFamily:"'Unbounded',sans-serif", fontWeight:700, fontSize:sz, padding:"7px 16px", borderRadius:10, transform:`rotate(${rotate}deg)`, ...style }}>{children}</div>;
}

/* ── QR code ── */
function QR({ size = 130 }) {
  const g=13, cs=size/g;
  const d="1011010011010010110100110101001101010011010100110101101001101011010011101001011010100111010010110101001010110100101110100101001011101010011010101101001101010110101001011010010110100110101001101011010010110101001110100101101010011101001011010100";
  const rs=[];
  for(let y=0;y<g;y++)for(let x=0;x<g;x++){
    const f=(x<3&&y<3)||(x>=g-3&&y<3)||(x<3&&y>=g-3);
    if(f||d[y*g+x]==="1") rs.push(<rect key={`${x}${y}`} x={x*cs+1} y={y*cs+1} width={cs-2} height={cs-2} rx={1.5} fill={C.dark}/>);
  }
  return <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}><rect width={size} height={size} fill="white" rx={10}/>{rs}</svg>;
}

/* ── Thermometer ── */
function Thermo({ temp, h = 170 }) {
  const fill = Math.max(0, Math.min((temp-18)/24, 1));
  const tier = getTier(temp);
  const bH = h - 38;
  return (
    <svg width={38} height={h} viewBox={`0 0 38 ${h}`} style={{flexShrink:0}}>
      <rect x={11} y={6} width={16} height={bH} rx={8} fill="#e8e8e4" stroke="#ddd" strokeWidth={1}/>
      <rect x={11} y={6+bH*(1-fill)} width={16} height={bH*fill} rx={fill>.95?8:0} fill={tier.color} style={{transition:"all .5s cubic-bezier(.4,0,.2,1)"}}/>
      <circle cx={19} cy={h-13} r={13} fill={tier.color} style={{transition:"fill .5s"}}/>
      <circle cx={19} cy={h-13} r={7} fill="white" opacity={.3}/>
      {[20,25,30,35,40].map(t=>{const yy=6+bH*(1-(t-18)/24);return <line key={t} x1={29} y1={yy} x2={34} y2={yy} stroke="#ccc" strokeWidth={1}/>})}
    </svg>
  );
}

/* ── Coupon Modal ── */
function Coupon({ tier, temp, onClose }) {
  const code = `FORA-MRZV-${tier.pct}${String(Math.floor(Math.random()*9000+1000))}`;
  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, zIndex:999, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(29,58,44,0.65)", backdropFilter:"blur(16px)", padding:20, animation:"fadeIn .3s" }}>
      <div onClick={e=>e.stopPropagation()} style={{ background:C.white, borderRadius:28, maxWidth:400, width:"100%", overflow:"hidden", boxShadow:"0 40px 100px rgba(0,0,0,0.3)", animation:"popIn .45s cubic-bezier(.34,1.56,.64,1)" }}>
        <div style={{ background:C.green, padding:"28px 28px 22px", position:"relative" }}>
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start"}}>
            <Logo w={100}/>
            <Stk bg={C.yellow} color={C.dark} sz={11} rotate={3}>{tier.emoji} {temp}°C</Stk>
          </div>
          <div style={{ fontFamily:"'Unbounded',sans-serif", fontWeight:900, fontSize:56, color:C.white, marginTop:18, lineHeight:1 }}>−{tier.pct}%</div>
          <div style={{ fontFamily:"'Nunito Sans',sans-serif", fontSize:16, color:"rgba(255,255,255,0.85)", marginTop:8, fontWeight:600 }}>знижка на все морозиво</div>
          <div style={{position:"absolute",bottom:0,left:20,right:20,borderBottom:"2px dashed rgba(255,255,255,0.3)"}}/>
          <div style={{position:"absolute",bottom:-13,left:-13,width:26,height:26,borderRadius:"50%",background:C.white}}/>
          <div style={{position:"absolute",bottom:-13,right:-13,width:26,height:26,borderRadius:"50%",background:C.white}}/>
        </div>
        <div style={{padding:"26px 28px 30px",textAlign:"center"}}>
          <p style={{fontFamily:"'Nunito Sans',sans-serif",fontSize:14,color:C.muted,margin:"0 0 18px"}}>Покажи цей купон на касі будь-якого магазину Фора</p>
          <div style={{display:"flex",justifyContent:"center",marginBottom:18}}><QR size={140}/></div>
          <div style={{fontFamily:"'Unbounded',sans-serif",fontSize:13,fontWeight:700,color:C.dark,background:C.gray,padding:"12px 20px",borderRadius:12,letterSpacing:2.5}}>{code}</div>
          <p style={{fontFamily:"'Nunito Sans',sans-serif",fontSize:11,color:"#bbb",margin:"14px 0 0"}}>Діє в усіх 340+ магазинах Фора · до кінця серпня 2026</p>
          <button onClick={onClose} style={{marginTop:22,background:C.green,color:C.white,border:"none",borderRadius:16,padding:"15px 0",width:"100%",fontFamily:"'Unbounded',sans-serif",fontWeight:700,fontSize:15,cursor:"pointer",boxShadow:`0 6px 24px ${C.green}55`,transition:"transform .2s"}} onMouseEnter={e=>e.target.style.transform="scale(1.02)"} onMouseLeave={e=>e.target.style.transform="scale(1)"}>Зберегти купон 🍦</button>
        </div>
      </div>
    </div>
  );
}


/* ═══════════════════ MAIN APP ═══════════════════ */
export default function App() {
  const [temp, setTemp] = useState(28);
  const [showCoupon, setShowCoupon] = useState(false);
  const [anim, setAnim] = useState(false);
  const tier = getTier(temp);
  const heat = Math.min(Math.max((temp-20)/22, 0), 1);

  const bg = heat<.25
    ? "linear-gradient(175deg,#e8f8ee 0%,#d0f0db 40%,#fffdf5 100%)"
    : heat<.5
    ? "linear-gradient(175deg,#fef9e7 0%,#fce588 40%,#fff8d0 100%)"
    : heat<.75
    ? "linear-gradient(175deg,#fff0e0 0%,#ffb74d 50%,#ffe8cc 100%)"
    : "linear-gradient(175deg,#ffe0d0 0%,#ff7b5a 50%,#ffd0c0 100%)";

  const go = () => { setAnim(true); setTimeout(()=>{setShowCoupon(true);setAnim(false)},500); };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Unbounded:wght@400;500;600;700;800;900&family=Nunito+Sans:ital,opsz,wght@0,6..12,400;0,6..12,600;0,6..12,700;0,6..12,800&display=swap" rel="stylesheet"/>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
        body{overflow-x:hidden;-webkit-font-smoothing:antialiased}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes popIn{from{opacity:0;transform:translateY(50px) scale(.92)}to{opacity:1;transform:none}}
        @keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
        @keyframes pulseSoft{0%,100%{transform:scale(1)}50%{transform:scale(1.04)}}
        @keyframes wiggle{0%,100%{transform:rotate(0)}20%{transform:rotate(-3deg)}40%{transform:rotate(3deg)}60%{transform:rotate(-2deg)}80%{transform:rotate(1deg)}}
        input[type=range]{-webkit-appearance:none;appearance:none;width:100%;height:10px;border-radius:5px;outline:none;cursor:pointer;background:transparent}
        input[type=range]::-webkit-slider-runnable-track{height:10px;border-radius:5px;background:linear-gradient(90deg,#00B15E 0%,#FFC42E 45%,#E5412E 100%)}
        input[type=range]::-moz-range-track{height:10px;border-radius:5px;background:linear-gradient(90deg,#00B15E 0%,#FFC42E 45%,#E5412E 100%)}
        input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:40px;height:40px;border-radius:50%;background:white;box-shadow:0 3px 14px rgba(0,0,0,0.18);cursor:grab;border:3px solid #00B15E;margin-top:-15px;transition:border-color .3s}
        input[type=range]::-moz-range-thumb{width:40px;height:40px;border-radius:50%;background:white;box-shadow:0 3px 14px rgba(0,0,0,0.18);cursor:grab;border:3px solid #00B15E}
      `}</style>

      <div style={{ minHeight:"100vh", background:bg, transition:"background 1s ease", display:"flex", flexDirection:"column", alignItems:"center", position:"relative", overflow:"hidden" }}>

        {/* Decorative plashky — Fora brand geometric shapes */}
        {[
          { c:`${C.green}10`, s:180, r:32, rot:15, pos:{top:-40,right:-50} },
          { c:`${C.yellow}12`, s:120, r:24, rot:-20, pos:{top:"28%",left:-40} },
          { c:`${C.red}0C`, s:100, r:20, rot:25, pos:{bottom:"12%",right:-30} },
          { c:`${C.purple}0A`, s:70, r:16, rot:-10, pos:{bottom:"42%",left:"7%"} },
          { c:`${C.blue}0C`, s:90, r:18, rot:12, pos:{top:"55%",right:"4%"} },
        ].map((p,i) => (
          <div key={i} style={{ position:"absolute", width:p.s, height:p.s, background:p.c, borderRadius:p.r, transform:`rotate(${p.rot}deg)`, zIndex:0, ...p.pos }}/>
        ))}

        {/* Floating ice creams */}
        {["🍦","🍧","🍨","🍦","🧊"].map((e,i) => (
          <div key={i} style={{ position:"absolute", fontSize:[44,32,38,28,34][i], opacity:.1, top:[`8%`,`22%`,`65%`,`78%`,`45%`][i], left:[`3%`,`85%`,`6%`,`88%`,`50%`][i], animation:`floatY ${5+i*.8}s ease-in-out infinite`, animationDelay:`${i*.7}s`, pointerEvents:"none", zIndex:0 }}>{e}</div>
        ))}

        {/* ═══ HEADER ═══ */}
        <header style={{ width:"100%", maxWidth:520, padding:"24px 24px 0", display:"flex", justifyContent:"space-between", alignItems:"center", position:"relative", zIndex:2 }}>
          <Logo w={120}/>
          <Stk bg={`${C.dark}10`} color={C.dark} sz={11} style={{backdropFilter:"blur(8px)"}}>Літо 2026</Stk>
        </header>

        {/* ═══ MAIN ═══ */}
        <main style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"24px 24px 40px", maxWidth:520, width:"100%", gap:28, position:"relative", zIndex:2 }}>

          {/* Title */}
          <div style={{textAlign:"center"}}>
            <h1 style={{ fontFamily:"'Unbounded',sans-serif", fontWeight:900, fontSize:"clamp(30px,8vw,44px)", color:C.dark, lineHeight:1.1, marginBottom:10 }}>Морозивна<br/>погода</h1>
            <p style={{ fontFamily:"'Nunito Sans',sans-serif", fontSize:"clamp(14px,3.8vw,17px)", color:C.muted, fontWeight:600, lineHeight:1.5, maxWidth:340, margin:"0 auto" }}>Що гарячіше надворі&nbsp;— то більша знижка на&nbsp;морозиво у&nbsp;Форі</p>
          </div>

          {/* Temperature control card */}
          <div style={{ background:"rgba(255,255,255,0.72)", backdropFilter:"blur(20px)", borderRadius:28, padding:"28px 24px 24px", width:"100%", border:"1px solid rgba(255,255,255,0.8)", boxShadow:"0 8px 40px rgba(0,0,0,0.06)" }}>
            <div style={{display:"flex", alignItems:"center", gap:16}}>
              <Thermo temp={temp}/>
              <div style={{flex:1, textAlign:"center"}}>
                <div style={{ fontFamily:"'Unbounded',sans-serif", fontWeight:900, fontSize:"clamp(60px,18vw,88px)", color:C.dark, lineHeight:1 }}>
                  {temp}<span style={{fontSize:"clamp(28px,7vw,40px)"}}>°C</span>
                </div>
                <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:`${tier.color}15`, borderRadius:12, padding:"6px 16px", marginTop:6, transition:"background .4s" }}>
                  <span style={{fontSize:20}}>{tier.emoji}</span>
                  <span style={{ fontFamily:"'Unbounded',sans-serif", fontWeight:700, fontSize:14, color:tier.color, transition:"color .4s" }}>{tier.label}</span>
                </div>
              </div>
            </div>
            {/* Slider */}
            <div style={{marginTop:20,padding:"0 4px"}}>
              <input type="range" min={20} max={42} value={temp} onChange={e=>setTemp(+e.target.value)} style={{width:"100%"}}/>
              <div style={{ display:"flex", justifyContent:"space-between", marginTop:4, fontFamily:"'Nunito Sans',sans-serif", fontSize:11, color:C.muted, fontWeight:600 }}>
                <span>+20°C</span>
                <span style={{opacity:.5}}>температура на вулиці</span>
                <span>+42°C</span>
              </div>
            </div>
          </div>

          {/* Tier progress bar */}
          <div style={{display:"flex",gap:4,width:"100%"}}>
            {TIERS.map((_,i) => (
              <div key={i} style={{ flex:1, height:6, borderRadius:3, background:i<=tier.idx ? tier.color : `${C.dark}10`, transition:"background .4s" }}/>
            ))}
          </div>

          {/* Discount display */}
          <div style={{ background:`${tier.color}10`, borderRadius:24, padding:"24px 28px", textAlign:"center", width:"100%", border:`2px solid ${tier.color}20`, transition:"all .5s", animation:anim?"wiggle .4s":undefined }}>
            <div style={{ fontFamily:"'Nunito Sans',sans-serif", fontSize:14, color:C.muted, fontWeight:600, marginBottom:4 }}>Твоя морозивна знижка</div>
            <div style={{ fontFamily:"'Unbounded',sans-serif", fontWeight:900, fontSize:"clamp(52px,14vw,76px)", color:C.dark, lineHeight:1, animation:"pulseSoft 2.5s ease-in-out infinite" }}>−{tier.pct}%</div>
            <div style={{ fontFamily:"'Nunito Sans',sans-serif", fontSize:13, color:C.muted, marginTop:8 }}>на все морозиво 🍦</div>
          </div>

          {/* CTA */}
          <button onClick={go} style={{ background:C.red, color:C.white, border:"none", borderRadius:18, padding:"18px 0", width:"100%", fontFamily:"'Unbounded',sans-serif", fontWeight:800, fontSize:"clamp(14px,4vw,17px)", cursor:"pointer", boxShadow:`0 8px 32px ${C.red}40`, transition:"all .25s cubic-bezier(.34,1.56,.64,1)" }}
            onMouseEnter={e=>{e.target.style.transform="scale(1.03)";e.target.style.boxShadow=`0 12px 40px ${C.red}55`}}
            onMouseLeave={e=>{e.target.style.transform="scale(1)";e.target.style.boxShadow=`0 8px 32px ${C.red}40`}}
          >
            Отримати морозивну знижку
          </button>

          {/* Tier grid */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, width:"100%" }}>
            {TIERS.map((t,i) => (
              <div key={i} style={{ background:tier.idx===i ? `${t.color}15` : "rgba(255,255,255,0.5)", borderRadius:16, padding:"12px 8px", textAlign:"center", border:tier.idx===i ? `2px solid ${t.color}30` : "2px solid transparent", transition:"all .3s", backdropFilter:"blur(8px)" }}>
                <div style={{fontSize:20,marginBottom:2}}>{t.emoji}</div>
                <div style={{ fontFamily:"'Unbounded',sans-serif", fontWeight:800, fontSize:17, color:C.dark }}>−{t.pct}%</div>
                <div style={{ fontFamily:"'Nunito Sans',sans-serif", fontSize:10, color:C.muted, fontWeight:600, marginTop:2 }}>{t.min}–{t.max}°C</div>
              </div>
            ))}
          </div>

          {/* Info */}
          <p style={{ textAlign:"center", fontFamily:"'Nunito Sans',sans-serif", fontSize:12, color:C.muted, lineHeight:1.8, maxWidth:320 }}>
            Скануй купон на касі будь-якого з 340+ магазинів Фора. Знижка діє на все морозиво — від ескімо до пломбіру.
          </p>
        </main>

        {/* Footer */}
        <footer style={{ width:"100%", padding:"16px 24px", textAlign:"center", position:"relative", zIndex:2, borderTop:`1px solid ${C.dark}08` }}>
          <p style={{ fontFamily:"'Nunito Sans',sans-serif", fontSize:12, color:`${C.dark}40` }}>Фора — морозивна твого району · fora.ua</p>
        </footer>
      </div>

      {showCoupon && <Coupon tier={tier} temp={temp} onClose={()=>setShowCoupon(false)}/>}
    </>
  );
}
