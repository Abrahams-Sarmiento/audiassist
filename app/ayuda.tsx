import { StyleSheet, Text, View } from "react-native";

const Ayuda = ()=> 
<View>
<Text style={styles.Title}> Acerca de Audiassist</Text> 
    
    <Text style={styles.Text1}> 
     
     Audiassist es una aplicacion hecha con la intencion de servir de herramienta
      de ayuda para los pacientes usuarios de Audifonos medicos BTE otorgando documentacion
      sobre el cuidado de los audifonos, posee un calendario que sirve para ubicar su proxima 
      cita con su medico y como canal de obtencio de consumibles como son los filtros de los
      audifonos, el hook y tubo con pegamento especial para los moldes.

      </Text>

      <Text style={styles.Text2}>Desarrollado Por Giorgio Zanni y Abrahams Sarmiento </Text>

      <Text style={styles.Text2}>Correos de Contacto:</Text>
      <Text style={styles.Text2}> G.zannicastillo@uandresbello.edu , a.sarmientoluna@uandresbello.edu</Text>   
     </View>
const styles = StyleSheet.create({
    Text1:{margin:20,},
    
    Text2:{textAlign:'center'},
    
    Title:{margin: 20, textAlign: 'center', fontWeight: 'bold'}
})
export default Ayuda
