import { countries_en, countries_ru, countries_fr, countries_es } from './countries';

export const translations = {
  
  en: {
    options: {
      orgType: [
        'Governmental agency',
        'Farmers association',
        'Soil science society',
        'NGOs',
        'Other'
      ],
      "regions": ["Africa", "Asia", "Europe", "Latin America and the Caribbean", "Near East and North Africa", "North America", "Pacific"],
      countries: countries_en,
      ongoingProgram: [
        'Yes',
        'No',
        "I don't know"
      ],
      soilTopics: [
        'Basic soil assessment',
        'Fertilization management',
        'Soil biodiversity',
        'Soil degradation',
        'Soil erosion',
        'Soil salinization',
        'Soil pollution',
        'Soil organic carbon',
        'Other'
      ],
      implementationScale: [
        'Regional',
        'National',
        'Sub-national',
        'Local'
      ],
      involveInstitutions: ['Yes', 'No'],
      targetCommunitySize: [
        'Less than 50 farmers',
        '50 to 200 farmers',
        '200 to 1000 farmers',
        'More than 1000 farmers'
      ],
      developedMaterials: ['Yes', 'No', 'Other'],
      accessToFunds: ['Yes', 'No'],
      agreementWithToR: [
        'Yes, I would like to implement the programme as a promoter and be trained by the GSP',
        'No, I would like to implement the programme as collaborator'
      ],
      actorType: ['Collaborator', 'Local Promoter', 'Sub-national Promoter', 'National Promoter'],
    }
  },
  ru: {
    options: {
      orgType: [
        'Государственное агентство',
        'Фермерское объединение',
        'Общество почвоведов',
        'НПО',
        'Другое'
      ],
      "regions": ["Африка", "Азия", "Европа", "Латинская Америка и Карибы", "Ближний Восток и Северная Африка", "Северная Америка", "Тихий океан"],
      countries: countries_ru,
      ongoingProgram: [
        'Да',
        'Нет',
        'Не знаю'
      ],
      soilTopics: [
        'Базовая оценка почвы',
        'Управление удобрением',
        'Биоразнообразие почвы',
        'Деградация почвы',
        'Эрозия почвы',
        'Солонцоватость почвы',
        'Загрязнение почвы',
        'Органический углерод почвы',
        'Другое'
      ],
      implementationScale: [
        'Региональный',
        'Национальный',
        'Субнациональный',
        'Местный'
      ],
      involveInstitutions: ['Да', 'Нет'],
      targetCommunitySize: [
        'Меньше 50 фермеров',
        'От 50 до 200 фермеров',
        'От 200 до 1000 фермеров',
        'Более 1000 фермеров'
      ],
      developedMaterials: ['Да', 'Нет', 'Другое'],
      accessToFunds: ['Да', 'Нет'],
      agreementWithToR: [
        'Да, я хотел бы реализовать программу в качестве промоутера и пройти обучение в GSP',
        'Нет, я хотел бы реализовать программу в качестве сотрудника'
      ],
      actorType: ['Сотрудник', 'Местный Промоутер', 'Субнациональный Промоутер', 'Национальный Промоутер'],

    }
  },

  fr: {
    options: {
      orgType: [
        'Agence gouvernementale',
        "Association d'agriculteurs",
        'Société des sciences du sol',
        'ONGs',
        'Autre'
      ],
      "regions": ["África", "Asia", "Europa", "América Latina y el Caribe", "Cercano Oriente y Norte de África", "Norteamérica", "Pacífico"],
      countries: countries_fr,
      ongoingProgram: [
        'Oui',
        'Non',
        'Je ne sais pas'
      ],
      soilTopics: [
        'Évaluation de base du sol',
        'Gestion de la fertilisation',
        'Biodiversité du sol',
        'Dégradation du sol',
        'Érosion du sol',
        'Salinisation du sol',
        'Pollution du sol',
        'Carbone organique du sol',
        'Autre'
      ],
      implementationScale: [
        'Régional',
        'National',
        'Sous-national',
        'Local'
      ],
      involveInstitutions: ['Oui', 'Non'],
      targetCommunitySize: [
        'Moins de 50 agriculteurs',
        '50 à 200 agriculteurs',
        '200 à 1000 agriculteurs',
        'Plus de 1000 agriculteurs'
      ],
      developedMaterials: ['Oui', 'Non', 'Autre'],
      accessToFunds: ['Oui', 'Non'],
      agreementWithToR: [
        'Oui, je voudrais mettre en œuvre le programme en tant que promoteur et être formé par le GSP',
        'Non, je voudrais mettre en œuvre le programme en tant que collaborateur'
      ],
      actorType: ['Collaborateur', 'Promoteur Local', 'Promoteur Sous-national', 'Promoteur National'],
    }
  },
  es: {
    options: {
      orgType: [
        'Agencia gubernamental',
        'Asociación de agricultores',
        'Sociedad de ciencias del suelo',
        'ONGs',
        'Otro'
      ],
      "regions": ["Afrique", "Asie", "Europe", "Amérique latine et les Caraïbes", "Proche-Orient et Afrique du Nord", "Amérique du Nord", "Pacifique"],
      countries: countries_es,
      ongoingProgram: [
        'Sí',
        'No',
        'No sé'
      ],
      soilTopics: [
        'Evaluación básica del suelo',
        'Gestión de fertilización',
        'Biodiversidad del suelo',
        'Degradación del suelo',
        'Erosión del suelo',
        'Salinización del suelo',
        'Contaminación del suelo',
        'Carbono orgánico del suelo',
        'Otro'
      ],
      implementationScale: [
        'Regional',
        'Nacional',
        'Subnacional',
        'Local'
      ],
      involveInstitutions: ['Sí', 'No'],
      targetCommunitySize: [
        'Menos de 50 agricultores',
        '50 a 200 agricultores',
        '200 a 1000 agricultores',
        'Más de 1000 agricultores'
      ],
      developedMaterials: ['Sí', 'No', 'Otro'],
      accessToFunds: ['Sí', 'No'],
      agreementWithToR: [
        'Sí, me gustaría implementar el programa como promotor y ser entrenado por el GSP',
        'No, me gustaría implementar el programa como colaborador'
      ],
      actorType: ['Colaborador', 'Promotor Local', 'Promotor Subnacional', 'Promotor Nacional'],
    }
  }
};
