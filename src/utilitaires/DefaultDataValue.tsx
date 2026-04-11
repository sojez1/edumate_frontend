import type { anneeScolaireForm, anneesScolaires, classeForm, classes, etudiantForm, oldStudentForm, UtilisateurForm } from "./DataTypes";



export const defaultAnneeScolaireForm:anneeScolaireForm={
    anneeScolaire: "",
    active: false
}

export const defaultAnneeScolaire:anneesScolaires = {
    id: 0,
    anneeScolaire: "",
    active: false
}

export const defaultClasseForm:classeForm = {
    nomClasse: "",
    appelation: "",
    ordreEnseignement: ""
}

export const defaultClasse:classes = {
    id: 0,
    nomClasse: "",
    appelation: "",
    ordreEnseignement: ""
}

export const defaultUserForm:UtilisateurForm={
    nom:"",
    prenoms:"",
    username:"",
    email: "",
    telephone:"",
    password:"",
    role: [] as string[]    
}


export const defaultEtudiantForm: etudiantForm = {
    matricule: "",
    utilisateur: defaultUserForm
}

export const defaultOldStudentForm:oldStudentForm = {
    etudiant: defaultEtudiantForm,
    classe: defaultClasse,
    anneeScolaire: defaultAnneeScolaire
}