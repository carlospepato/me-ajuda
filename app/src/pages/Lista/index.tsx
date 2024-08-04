import { useState } from 'react';
import {SectionList, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function Lista(){
  const [visibleSections, setVisibleSections] = useState<VisibleSections>({});
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 22,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      backgroundColor: 'rgba(247,247,247,1.0)',
    },
    sectionHeader: {
      fontSize: 14,
      fontWeight: 'bold',
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
      backgroundColor: 'rgba(230,230,230,1.0)', // Cor de fundo diferente
    },
    bold: {
      fontWeight: 'bold',
    },
  });

  const resolutions = [
    {
      title: 'Inundações',
      data: [
        'Mantenha-se informado sobre alertas meteorológicos, tenha um kit de emergência pronto e planeje rotas de evacuação.',
        'Evite áreas inundadas, mova-se para terrenos mais altos e não dirija em ruas alagadas.',
        'Evite contato com água contaminada, descarte alimentos e água que estiveram em contato com a inundação e documente os danos para seguros.'
      ]
    },
    {
      title: 'Incêndios',
      data: [
        'Crie uma zona de segurança ao redor de sua casa, mantenha extintores de incêndio acessíveis e planeje rotas de fuga.',
        'Siga as instruções das autoridades, evacue imediatamente se necessário e cubra o nariz e a boca para evitar inalar fumaça.',
        'Não reentre até que as autoridades deem permissão, verifique danos estruturais e evite fios elétricos caídos.'
      ]
    },
    {
      title: 'Terremotos',
      data: [
        'Fixe móveis pesados, tenha um kit de emergência e planeje pontos de encontro com a família.',
        'Proteja-se sob móveis robustos, fique longe de janelas e mantenha-se calmo.',
        'Verifique ferimentos, evite usar elevadores e esteja preparado para réplicas.'
      ]
    },
    {
      title: 'Deslizamentos de Terra',
      data: [
        'Esteja atento a sinais de deslizamento, como rachaduras no solo, e tenha um plano de evacuação.',
        'Evacue imediatamente, evite áreas de deslizamento e siga as instruções das autoridades.',
        'Evite áreas afetadas até que seja seguro, verifique danos estruturais e ajude vizinhos se possível.'
      ]
    },
    {
      title: 'Tempestades',
      data: [
        'Mantenha-se informado sobre alertas meteorológicos, proteja janelas e portas e tenha um kit de emergência.',
        'Fique longe de janelas, evite usar aparelhos elétricos e mantenha-se em um local seguro.',
        'Verifique danos, evite fios elétricos caídos e ajude vizinhos se necessário.'
      ]
    },
    {
      title: 'Furacões e Ciclones',
      data: [
        'Tenha um plano de evacuação, proteja sua casa com persianas e estocar suprimentos essenciais.',
        'Siga as instruções das autoridades, evacue se necessário e mantenha-se em um local seguro.',
        'Evite áreas inundadas, verifique danos estruturais e ajude vizinhos se possível.'
      ]
    },
    {
      title: 'Secas',
      data: [
        'Economize água, plante vegetação resistente à seca e mantenha-se informado sobre as condições climáticas.',
        'Reduza o consumo de água, reutilize água sempre que possível e siga as orientações das autoridades.',
        'Continue economizando água, ajude a comunidade a se recuperar e participe de iniciativas de conservação.'
      ]
    }
  ];

  type VisibleSections = {
    [key: string]: boolean;
  };
  

  const toggleSection = (title: string) => {
    setVisibleSections((prevState) => ({
      ...prevState,
      [title]: !prevState[title]
    }));
  };


  return (
    <View style={styles.container}>
    <SectionList
      sections={resolutions}
      renderItem={({ item, section }) =>
        visibleSections[section.title] ? (
          <Text style={styles.item}>
            • {item} 
          </Text>
        ) : null
      }
      renderSectionHeader={({ section }) => (
        <View style={styles.header}>
          <Text style={styles.sectionHeader}>{section.title}</Text>
          <TouchableOpacity onPress={() => toggleSection(section.title)}>
            <Ionicons
              name={visibleSections[section.title] ? 'chevron-up' : 'chevron-down'}
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
      )}
      keyExtractor={(item, index) => `basicListEntry-${item}-${index}`}
    />
  </View>
  )
}