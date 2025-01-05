const Counter = ({count, name='Counter', handleClick, action, style}) => {
    return(
        <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">{name}: {count}</h1>
                <button className={style} onClick={handleClick}>{action}</button>
            {/* <button className="bg-orange-500 hover:bg-orange-900 rounded px-4 py-2 text-white font-bold" onClick={decrement_by_1}>Incrémenter de 1</button> */}
        </div>
    );
};

export default Counter;