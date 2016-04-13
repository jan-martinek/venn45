var chosen = "path4894";
var colorhex = "FFFFFF";
var whiteTextTreshold = 10;

var venn = {
  config: {},  
  
  // init
  init: function(sets) {
    this.config = config;
    
    if (sets == 4) {
      for (var i = 0; i <= 3; i++) {
        document.getElementById('cat'+(i+1)).textContent = this.config.categories4[i];  
      }
    } else if (sets == 5) {
      for (var i = 0; i <= 4; i++) {
        document.getElementById('cat'+(i+1)).textContent = this.config.categories5[i];  
      }
    }
    
    this.generateScale();
  },
  generateScale: function() {
    var colors = this.config.colors;
    var selector = document.getElementById('scale');
    
    for (var i = 0; i <= 30; i++) {
      if (i < colors.length) {
        var color = colors[i];  
      } else {
        var color = colors[colors.length-1];
      }
      var text = i > 0 ? i : "";
    
      selector.innerHTML = selector.innerHTML + "<span style='padding: 20px 10px; margin: 0 5px; cursor:pointer; background: #"+color+";' onclick='venn.clickColor(\"#"+color+"\",-50,90,\""+text+"\")' alt='#"+color+"' />"+i+"</span>";
    }
  },
  
  
  // colorize
  choosePath: function(elem, event)
  {
      document.getElementById(elem.id).style.fill = "blue";
      console.log(elem.id);
      chosen = elem.id;
  },
  clickColor: function(hex, seltop, selleft, text)
  {
      document.getElementById(chosen).style.fill = hex;  
      document.getElementById(chosen+"t").textContent = text;  
      if (text >= whiteTextTreshold) {
        document.getElementById(chosen+"t").style.fill = "white"; 
      } else {
        document.getElementById(chosen+"t").style.fill = "black"; 
      }   
  },
  setDescription: function(el) {
    document.getElementById("description").textContent = el.value;
  },
  
  
  // export
  exportDiagram: function(format) {
    if (format == 'png') {
      this.exportAsPng(document.getElementById("svg_venn_diagram"), "diagram.png");
    } else if (format == 'svg') {
      this.exportAsSvg();
    }
  },
  exportAsPng: function(el, filename) {
    saveSvgAsPng(document.getElementById("svg_venn_diagram"), "diagram.png");
  },
  exportAsSvg: function() {
      var fileName = 'Venn_diagram.svg';
      var svg = document.getElementById("svg_venn_diagram");
      var serializer = new XMLSerializer();
      var svg_blob = new Blob([serializer.serializeToString(svg)],
                              {'type': "image/svg+xml"});
      svg_blob.lastModifiedDate = new Date();
      svg_blob.name = fileName;
      var url = URL.createObjectURL(svg_blob);

      var svg_win = window.open(url, "svg_win");
      svg_win.document.doctype.name = "svg";
  }
}
