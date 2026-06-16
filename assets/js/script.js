async function buscarEncomenda() {
    const codigo = document.getElementById('codigoInput').value;
    const areaResultado = document.getElementById('areaResultado');
    areaResultado.classList.add('d-none');
    const response = await fetch(`http://localhost:3000/rastreio/${codigo}`);
    const dados = await response.json();
    areaResultado.classList.remove('d-none');
    document.getElementById('resStatus').innerText = dados.status;
    document.getElementById('resLocal').innerText = dados.local;
}