import { useState, useEffect } from "react"

const Square = ({ chara, col }) => {
    const [c, setC] = useState(col);

    useEffect(() => {
        setC(co => col);
    }, [col])

    return (
        <div className='border-[0.13rem] border-solid border-[#383C3F] m-[0.2rem] w-16 h-16 flex items-center justify-center rounded-md'>
            <p className="text-2xl text-white font-bold w-full h-full text-center content-center rounded-md" style={{backgroundColor: c}}>{chara}</p>
        </div>
    )
}

const Row = ({ k, row, word, color }) => {
    const [w, setW] = useState(word);
    const [c, setC] = useState(color);

    // per memorizzare nella singola riga una parola inserita dall'utente, per fare in modo che non venga sovrascritta con la successiva
    useEffect(() => {
        function setValues() {
            setW(w => word);
            setC(co => color);
        }
        if(row == k) {
            setValues();
        }
    }, [word]);

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
    const PAROLA = "AMORE";
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

    async function handleWin() {
        const dataObj = new Date();
        let currentDay = String(dataObj.getDate()).padStart(2, '0');
        let currentMonth = String(dataObj.getMonth() + 1).padStart(2, "0");
        let currentYear = dataObj.getFullYear();
        let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;

        const dataToSend = {
            "username": sessionStorage.getItem("Username"),
            "righe": r + 1,
            "dataP": currentDate
        }

        const response = await fetch('http://localhost:4000/win', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        });

        alert("Hai vinto! Dati memorizzati.")
    }

    // provare a fare una funzione di gestione della riga usando un while col contatore riga
    function changeColor(w) {
        const insWord = w;
        const charOut = [];  // tiene traccia delle lettere presenti
        insWord.forEach((ch, ind) => {
            if (ch == PAROLA[ind] && !(ch in charOut)) {
                colors[ind] = '#538d4e';  // verde
                charOut.push(ch);
            }
            else
                if (PAROLA.includes(ch) && !(ch in charOut)) {
                    colors[ind] = '#b59f3b';  // giallo
                    charOut.push(ch);
                }
                else colors[ind] = '';
        });

        const allGreen = colors.every(color => color === '#538d4e');

        if(allGreen) {
            handleWin();
        }

        setColors(() => ['', '', '', '', ''])
    }

    function writingHandler(e) {
        if(alphabet.includes(e.key) && word.length < 5) {
            setWord((prevWord) => [...prevWord, e.key.toUpperCase()]);
        }

        // avanza di riga e resetta la il buffer contenente la parola se la parola inserita è completa e si preme enter
        if(e.key == 'Enter' && word.length == 5) {
            changeColor(word);
            setWord([]);
            setR(r => r + 1);
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
                {rows.map((row, ind) => {
                    return <Row key={row.rowN} k={row.rowN} row={r} word={word} color={r == ind ? colors : ['', '', '', '', '']}/>  // k è la key, l'attributo key stesso non può essere usato come prop
                })}
            </div>
        </>
    )
}

export default Table;

// LS TI AMO 