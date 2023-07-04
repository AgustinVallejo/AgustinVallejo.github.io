$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "assets/CV_eng.csv",
        dataType: "text",
        success: function(data) {processData(data);}
     });
});

$('#eng').on('click', function(event) {
    $("#accordion").empty()
    $.ajax({
        type: "GET",
        url: "assets/CV_eng.csv",
        dataType: "text",
        success: function(data) {processData(data);}
     });
  });

$('#esp').on('click', function(event) {
    $("#accordion").empty()
    $.ajax({
        type: "GET",
        url: "assets/CV.csv",
        dataType: "text",
        success: function(data) {processData(data);}
     });
});

function processData(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');
    var lines = [];

    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {

            var tarr = [];
            for (var j=0; j<headers.length; j++) {
                // tarr.push(headers[j]+":"+data[j]);
                tarr.push(data[j]);
            }
            lines.push(tarr);
        }
    }
    // INDEXES
    // 0: "TYPE"
    // 1: "MAGNITUDE"
    // 2: "TITLE"
    // 3: "FROM"
    // 4: "TO"
    // 5: "DESCRIPTION"
    // 6: "WHERE"
    // 7: "WHERE2"
    let lastHeader = ""
    let lastTitle = ""
    let content = "<p>"
    lines.forEach(function(row, indice, array) {
        if (row[2] != lastTitle){ // Si hay nuevo item
            lastTitle = row[2]
            $("#accordion").append(content+"</ul>") // Poner lo anterior y cerrar párrafo
            content = "<ul>" + row[2] // Iniciar párrafo y empezar con el título

            if (row[5] == ""){
                if (row[6] != ""){content += ", "+row[6]}
                if (row[7] != ""){content += ", "+row[7]}
            }

            // DATES
            if (row[4] == "X"){content += ". <b>(" + row[3] + ")</b>"}
            else{content += ". <b>(" + row[3] + "-" + row[4] + ")</b>"}
            content += "<ul>"
        }
        // ADDITIONAL INFO
        if (row[5] != ""){
             content += "<li>"+row[5]
            if (row[6] != ""){content += ", "+row[6]}
            if (row[7] != ""){content += ", "+row[7]}
        }

        if (row[0] != lastHeader){ // Si hay nuevo header
            $("#accordion").append("<h3>"+row[0]+"</h3>")
            lastHeader = row[0]
        }
        
    })
    $("#accordion").append(content+"</p>")
}