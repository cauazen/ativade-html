const botaoBuscar = document.getElementById('botao-buscar')
const campoEntrada = document.getElementById('entrada')

botaoBuscar.addEventListener('click', async () => {
    const busca = campoEntrada.value.toLowerCase().trim();
    if (!busca) return;

    try {
        const resposta = await fetch('https://pokeapi.co/api/v2/pokemon/' + busca)
        if (!resposta.ok) throw new Error('Pokemon não encontrado')

        const dados = await resposta.json()

        document.getElementById("nome").textContent = dados.name;
        document.getElementById("numero").textContent = `#${dados.id}`;
        document.getElementById("imagem").src = dados.sprites.front_default;

        const tipos = document.getElementById("tipo");
        tipos.innerHTML = ''; // Limpar tipos anteriores

        dados.types.forEach(tipoInfo => {
            const tipo = tipoInfo.type.name;
            const chip = document.createElement('span');
            chip.className = 'chip-tipo';
            chip.textContent = tipo;
            chip.style.backgroundColor = corDotipo(tipo);
            tipos.appendChild(chip);
        });

    } catch (error) {
        alert(error.message);
    }

    function corDotipo(tipo) {
        const cores = {
            eletric:"#fcd603",
            fire: "#f94144",
            water: "#577590",
            grass: "#f9c74f",
            bug: "#90be6d",
            normal: "#adb5bd",
            poison: "#9d4edd",
            ground: "#74a261",
            psychic: "#f72585",
            fighting: "#d00000",
            rock: "#6c584c",
            ghost: "#8338ec",
            dragon: "#3a0ca3",
            dark: "#2d3142",
            ice: "#a8dadc",
            fairy: "#ffafcc",
            flying: "#48cae4",
            steel: "#8d99ae"
        };
        return cores[tipo] || "#fcd603";
    }
});
