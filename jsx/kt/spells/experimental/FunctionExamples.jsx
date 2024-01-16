function ui_connectorPropertiesButton_clicked ()
{
    var props = DuAEF.DuAE.Comp.getSelectedProps();
    if ( props.length == 0 ) return;


    if (connector.type == 1 || connector.type == 4 || connector.type == 5) //Property or expose transform or IK
    {
        var min = parseFloat( ui_connectorMinimumEdit.text );
        var max = parseFloat( ui_connectorMaximumEdit.text );
        var type = DuAEF.DuAE.Types.VALUE;
        if ( ui_connectorTypeList.selection.index == 1 ) type = DuAEF.DuAE.Types.VELOCITY;
        var axis = DuAEF.DuAE.Axis.X;
        if ( connector.masterProp.dimensions == 2 || connector.masterProp.dimensions == 3 )
        {
            if ( ui_connectorAxisList.selection.index == 1 ) axis = DuAEF.DuAE.Axis.Y;
            else if ( ui_connectorAxisList.selection.index == 2 ) axis = DuAEF.DuAE.Axis.Z;
        }
        else if ( connector.masterProp.dimensions == 4 )
        {
            if ( ui_connectorAxisList.selection.index == 0 ) axis = DuAEF.DuAE.Axis.RED;
            else if ( ui_connectorAxisList.selection.index == 1 ) axis = DuAEF.DuAE.Axis.GREEN;
            else if ( ui_connectorAxisList.selection.index == 2 ) axis = DuAEF.DuAE.Axis.BLUE;
            else if ( ui_connectorAxisList.selection.index == 3 ) axis = DuAEF.DuAE.Axis.ALPHA;
            else if ( ui_connectorAxisList.selection.index == 4 ) axis = DuAEF.DuAE.Axis.HUE;
            else if ( ui_connectorAxisList.selection.index == 5 ) axis = DuAEF.DuAE.Axis.SATURATION;
            else if ( ui_connectorAxisList.selection.index == 6 ) axis = DuAEF.DuAE.Axis.VALUE;
        }

        app.beginUndoGroup( 'Duik | ' + "Connector" );

        var effect = null;
        var it = new Iterator( props );
        it.do( function( p )
        {
            effect = DuAEF.Duik.Rigging.connector( p, connector.masterProp, effect, min, max, axis, type );
        } );

        app.endUndoGroup();
    }

    else if (connector.type == 2) //Effector
    {
        Duik.automation.effector(connector.masterLayer);
    }

    else if (connector.type == 3) //Effector Map
    {
        app.beginUndoGroup( 'Duik | ' + "Connector" );

        var effect = null;
        var it = new Iterator( props );
        it.do( function( p )
        {
            effect = DuAEF.Duik.Automation.mapEffector( p, connector.masterLayer, effect );
        } );

        //set values 
        var textureEffect = connector.masterLayer.effect(DuAEF.Duik.PseudoEffects.MAP_EFFECTOR.matchName);
        if (textureEffect)
        {
            textureEffect(DuAEF.Duik.PseudoEffects.MAP_EFFECTOR.index['Minimum_Slider']).setValue(parseFloat( ui_connectorMinimumEdit.text ));
            textureEffect(DuAEF.Duik.PseudoEffects.MAP_EFFECTOR.index['Maximum_Slider']).setValue(parseFloat( ui_connectorMaximumEdit.text ));
            textureEffect(DuAEF.Duik.PseudoEffects.MAP_EFFECTOR.index['Channel_Popup']).setValue(ui_connectorAxisList.selection.index+1);
        }

        app.endUndoGroup();
    }
    
}


function ui_connectorDoubleSliderButton_clicked()
    {
        var comp = DuAEF.DuAE.Project.getActiveComp();
        if (!comp) return;

        //create controller
        var layer = Duik.controllers.create( DuAEF.Duik.Controller.Types.DOUBLE_SLIDER )[0];

        //ready
        connectorPick();
    }