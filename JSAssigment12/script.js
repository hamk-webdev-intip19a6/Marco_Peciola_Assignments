
//SortableAndDraggableList
$( function() {
    $( "#accordion" )
      .accordion({
        header: "> div > h3"
      })
      .sortable({
        axis: "y",
        handle: "h3",
        stop: function( event, ui ) {
          // IE doesn't register the blur when sorting
          // so trigger focusout handlers to remove .ui-state-focus
          ui.item.children( "h3" ).triggerHandler( "focusout" );
 
          // Refresh accordion to handle new order
          $( this ).accordion( "refresh" );
        }
      });
  } );
  
//Datepicker
$(function () {
    $("#datepicker").datepicker({
        showWeek: true,
        firstDay: 1
    });
});

//Slider
$(function () {
    $("#slider-range-max").slider({
        range: "max",
        min: 0,
        max: 140,
        value: 50,
        slide: function (event, ui) {
            $("#amount").val(ui.value);
        }
    });
    $("#amount").val($("#slider-range-max").slider("value"));
});

//Autocomplete

$(document).ready(function(){
    $.getJSON("data.json", function(data){
        let lista = []
        for (let i=0; i<49; i++){
            lista.push(data[i].name)
        }
        $( function() {
            $( "#countries" ).autocomplete({
              source: lista
            });
          } );  
    }).fail(function(){
        console.log("An error has occurred.");
    });
});