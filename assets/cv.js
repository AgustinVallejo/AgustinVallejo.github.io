$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "assets/CV.csv",
        dataType: "text",
        success: function(data) {processData(data, 8);}
     });
});

$('#eng').on('click', function(event) {
    $("#accordion").empty();
    $.ajax({
        type: "GET",
        url: "assets/CV.csv",
        dataType: "text",
        success: function(data) {processData(data, 8);}
     });
});

$('#esp').on('click', function(event) {
    $("#accordion").empty();
    $.ajax({
        type: "GET",
        url: "assets/CV.csv",
        dataType: "text",
        success: function(data) {processData(data, 0);}
     });
});

function processData(allText, langIndex) {
    // Fix HTML links before processing - ensure href attributes have quotes
    allText = allText.replace(/<a href=([^"'][^>]*)>/g, '<a href="$1">');
    
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(';');  // Using semicolon as delimiter
    var lines = [];

    for (var i=1; i<allTextLines.length; i++) {
        if (allTextLines[i].trim() === '') continue; // Skip empty lines
        
        var data = allTextLines[i].split(';');  // Using semicolon as delimiter
        if (data.length == headers.length) {
            var tarr = [];
            for (var j=0; j<headers.length/2; j++) {
                tarr.push(data[j+langIndex]);
            }
            lines.push(tarr);
        } else {
            console.error("Line " + i + " has incorrect number of fields: " + data.length);
        }
    }
    // INDEXES IN SPANISH
    // 0: "TYPE"
    // 1: "MAGNITUDE"
    // 2: "TITLE"
    // 3: "FROM"
    // 4: "TO"
    // 5: "DESCRIPTION"
    // 6: "WHERE"
    // 7: "WHERE2"

    // INDEXES IN ENGLISH
    // 8: "TYPE"
    // 9: "MAGNITUDE"
    // 10: "TITLE"
    // 11: "FROM"
    // 12: "TO"
    // 13: "DESCRIPTION"
    // 14: "WHERE"
    // 15: "WHERE2"

    // Group the CV entries by type (section)
    const groupedByType = {};
    lines.forEach(function(row) {
        const type = row[0];
        if (!groupedByType[type]) {
            groupedByType[type] = [];
        }
        groupedByType[type].push(row);
    });

    // Render each section
    Object.keys(groupedByType).forEach(function(type) {
        // Create section header
        $("#accordion").append(`<h3>${type}</h3>`);
        const sectionContent = $("<div class='cv-section-content'></div>");
        
        // Group entries by title
        const entriesByTitle = {};
        groupedByType[type].forEach(function(row) {
            const title = row[2];
            if (!entriesByTitle[title]) {
                entriesByTitle[title] = [];
            }
            entriesByTitle[title].push(row);
        });
        
        // Render each title group
        Object.keys(entriesByTitle).forEach(function(title) {
            const entries = entriesByTitle[title];
            const firstEntry = entries[0];
            
            // Create entry container
            const entryDiv = $("<div class='cv-item mb-3'></div>");
            
            // Add title and institution
            let titleHtml = `<p class="mb-1"><strong>${firstEntry[2]}</strong>`;
            
            // Add location if no description (common for education entries)
            if (firstEntry[5] === "") {
                if (firstEntry[6] !== "") {
                    titleHtml += `, ${firstEntry[6]}`;
                }
                if (firstEntry[7] !== "") {
                    titleHtml += `, ${firstEntry[7]}`;
                }
            }
            
            // Add date range
            if (firstEntry[4] === "") {
                titleHtml += ` <b>(${firstEntry[3]})</b>`;
            } else if (firstEntry[4] === "X") {
                titleHtml += ` <b>(${firstEntry[3]})</b>`;
            } else {
                titleHtml += ` <b>(${firstEntry[3]}-${firstEntry[4]})</b>`;
            }
            
            titleHtml += "</p>";
            entryDiv.append(titleHtml);
            
            // Add descriptions if any
            const entriesWithDescription = entries.filter(row => row[5] !== "");
            if (entriesWithDescription.length > 0) {
                const descList = $("<ul class='mb-0'></ul>");
                entriesWithDescription.forEach(function(row) {
                    let descHtml = row[5];
                    if (row[6] !== "") {
                        descHtml += `, ${row[6]}`;
                    }
                    if (row[7] !== "") {
                        descHtml += `, ${row[7]}`;
                    }
                    descList.append(`<li>${descHtml}</li>`);
                });
                entryDiv.append(descList);
            }
            
            sectionContent.append(entryDiv);
        });
        
        $("#accordion").append(sectionContent);
    });
}