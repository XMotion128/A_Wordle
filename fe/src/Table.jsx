import { useState, useEffect } from "react"

const Square = ({ chara, col }) => {
    const [c, setC] = useState(col);
    useEffect(() => {
        console.log('colore aggiornato');
        setC(col);
    }, [col])

    return (
        <div className='border-[0.13rem] border-solid border-[#383C3F] m-[0.2rem] w-16 h-16 flex items-center justify-center rounded-md'>
            <p className="text-2xl text-white font-bold" style={{backgroundColor: c}}>{chara}</p>
        </div>
    )
}

const Row = ({ k, row, word, color }) => {
    const [w, setW] = useState(word);
    const [c, setC] = useState(color);

    // per memorizzare nella singola riga una parola inserita dall'utente, per fare in modo che non venga sovrascritta con la successiva
    useEffect(() => {
        async function setValues() {
            await setW(word);
            await setC(color);
            return;
        }
        if(row == k) {
            setValues();
        }
    }, [word, color]);

    const letters = [
        {ind: 0},
        {ind: 1},
        {ind: 2},
        {ind: 3},
        {ind: 4}
    ]

    return (
        <div className="flex flex-row">
            {letters.map((l) => {
                return <Square key={l.ind} chara={w[l.ind]} col={c[l.ind]}/>
            })}
        </div>
    )
}

const Table = () => {
    const [word, setWord] = useState([]);
    const [r, setR] = useState(0);   // riga di inserimento attuale
    const [colors, setColors] = useState(['', '', '', '', '']);
    const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    useEffect(() => {
        document.addEventListener('keydown', writingHandler, true);

        // Cleanup del listener quando il componente si smonta, non so esattamente perchè ma evita problemi di input
        return () => {
            document.removeEventListener('keydown', writingHandler, true);
        };
    }, [word]);

    async function writingHandler(e) {
        if(alphabet.includes(e.key) && word.length < 5) {
            setWord((prevWord) => [...prevWord, e.key.toUpperCase()]);
        }

        // avanza di riga e resetta la il buffer contenente la parola se la parola inserita è completa e si preme enter
        if(e.key == 'Enter' && word.length == 5) {
            // invio parola al backend
            const res = await fetch('http://localhost:4000/checkWord', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(word),
            })
            .then((r) => r.text().then((resInJSON) => setColors(JSON.parse(resInJSON))))
            .then(setR(r + 1))
            .then(setWord([]));
            
        }

        // cancella l'ultima lettera se il tasto premuto è backspace
        if(e.key == 'Backspace') {
            setWord((prevWord) => {
                const w = [...prevWord];
                w.pop();
                return w;
            });
        }
    }    

    const rows = [
        {rowN: 0},
        {rowN: 1},
        {rowN: 2},
        {rowN: 3},
        {rowN: 4},
        {rowN: 5},
    ]

    return (
        <>
            <div className='p-4 self-center'>
                {rows.map((row) => {
                    return <Row key={row.rowN} k={row.rowN} row={r} word={word} color={colors}/>  // k è la key, l'attributo key stesso non può essere usato come prop
                })}
            </div>
        </>
    )
}

export default Table;