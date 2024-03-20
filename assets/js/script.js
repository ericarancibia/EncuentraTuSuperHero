$(() => { 


    $("form").submit(function (event) {
        event.preventDefault();

        let valueInput = $("#superhero-input").val();
        let regExNumbers = /^[0-9]*$/
        
        if (valueInput == ""){
            alert("Debe ingresar un número")
        }else if (valueInput < 1 || valueInput > 732){
            alert("Por favor ingrese un número entre 1 y 732")
        }

        if (regExNumbers.test(valueInput) == false){
            alert("Debe ingresar solo números")
        }
        
        $.ajax({
            url: "https://superheroapi.com/api.php/4905856019427443/" + valueInput,
            method: "get",
            success: function (response) {
                console.log(response)
                $("#div-superheroCard").html(`
                    <div id="superhero-card" class="card border-dark bg-dark mb-3" style="max-width: 540px;">
                        <div class="row g-0">
                            <div class="card-header text-center text-white">
                                !Super Héroe Encontrado!
                            </div>
                            <div class="col-md-4">
                                <img src="${response.image.url}" class="img-fluid rounded-start" alt="...">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body bg-dark text-white">
                                    <h5 class="card-title">Nombre: ${response.name}</h5>
                                    <p class="card-text">Conexiones: ${response.connections["group-affiliation"]}</p>
                                </div>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item bg-dark text-white">Publicado por: ${response.biography.publisher}</li>
                                    <li class="list-group-item bg-dark text-white">Ocupación: ${response.work.occupation}</li>
                                    <li class="list-group-item bg-dark text-white">Primera Aparición: ${response.biography["first-appearance"]}</li>
                                    <li class="list-group-item bg-dark text-white">Altura: ${response.appearance.height}</li>
                                    <li class="list-group-item bg-dark text-white">Peso: ${response.appearance.weight}</li>
                                    <li class="list-group-item bg-dark text-white">Alias: ${response.biography.aliases}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `);

                let chart = new CanvasJS.Chart("div-superheroChart", {
                    theme: "dark1",
                    
                    animationEnabled: true,
                    title: {
                        text: `Estadísticas de poder:  ${response.name}`,
                        fontColor: "white",
                        fontFamily: "Bangers",
                    },
                    data: [{
                        type: "pie",
                        startAngle: 25,
                        toolTipContent: "<b>{label}</b>: {y}",
                        showInLegend: "true",
                        legendText: "{label}",
                        indexLabelFontSize: 16,
                        indexLabelFontFamily: "Bangers",
                        indexLabel: "{label} - {y}",
                        dataPoints: [
                            { y: response.powerstats.intelligence, label: "Inteligencia" },
                            { y: response.powerstats.strength, label: "Fuerza" },
                            { y: response.powerstats.speed, label: "Velocidad" },
                            { y: response.powerstats.durability, label: "Durabilidad" },
                            { y: response.powerstats.power, label: "Poder" },
                            { y: response.powerstats.combat, label: "Combate" }
                        ]
                    }]
                });
                chart.render();
            },
        })
    });
});