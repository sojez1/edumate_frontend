
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
        lieuNaissance: string;
        pere?:Parents;
        mere?:Parents;
    }

    export type candidatAdmission = {
        id: number;
        nom: string;
        prenom: string;
        lieuNaissance: string;
        pere?:Parents;
        mere?:Parents;
    }

    export type demandeAdmissionForm = {
        candidat: candidatAdmissionForm;
        classeDemandee: string;
        motivation: string;
    }

    export type demandeAdmission = {
        id: number;
        candidat: candidatAdmission;
        classeDemandee: string;
        motivation: string;
        dateDemande: string;}