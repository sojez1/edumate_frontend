
export type classes = {
    id: number;
    nomClasse: string;
    appelation: string;
    ordreEnseignement: string;
}

    export type classeForm = {
        nomClasse: string;
        appelation: string;
        ordreEnseignement: string;
    }

    export type anneeScolaireForm = {
        anneeScolaire: string;
        active?: boolean;
    }
    

    export type anneesScolaires = {
        id: number;
        anneeScolaire: string;
        active: boolean;
    }

    export type ParentForm = {
        nom: string;
        prenom: string;
    }

    export type Parents = {
        id: number;
        nom: string;
        prenom: string; 
    }

    export type candidatAdmissionForm = {
        nom: string;
        prenom: string;
        sexe: string;
        dateNaissance: string;
        email: string;
        numeroTelephone: string;
        adresse: string
    }

    export type candidatAdmission = {
        id: number;
        nom: string;
        prenom: string;
        sexe: string;
        dateNaissance: Date;
        email: string;
        numeroTelephone: string;
        adresse: string
    }

    export type unDocument = {
    id: string,
    file:File
}

export type demandeAdmissionKey = {
    candidatId: number;
    classeId: number;
    anneeScolaireId: number
}

    export type demandeAdmissionForm = {
        candidat: candidatAdmissionForm;
        anneeScolaire: string;
        classeSouhaitee: string
        motivation: string;
        documentsJoint?: unDocument[];        
    }

    export type demandeAdmission = {
        id: string;
        dateDemande: Date;
        numeroDemande: string;
        candidat: candidatAdmissionForm;
        anneeScolaire: string;
        classeSouhaitee: string
        motivation: string;
        documentsJoint?: unDocument[]; 
    
    }

    export type admissionDetailsForm = {
        dateNaissance:string;
        anneeScolaire:string;
        numeroDemande:string;
        demandeur:string;
        classeSollicitee: string;
        statut:string;
        dateDemande:string
    }