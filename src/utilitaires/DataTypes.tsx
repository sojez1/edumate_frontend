
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

    export type unDocumentForm = { // pour formulaire d'enregistrement d'un document
        localId: string; // juste pour des besoins d'unicite cote frontend. A retirer avant post vers API
        typeDoc:string;
        nomDuDocument: string
        documentData:File
    }

    export type unDocument = {// pour document recu du backend
        id:number;
        typeDoc:string;
        nomDuDocument: string
        documentData:File
    }

export type demandeAdmissionKey = { // pour cle primaire (compose) de demande d'admission
    candidatId: number;
    classeId: number;
    anneeScolaireId: number
}

    export type demandeAdmissionForm = { // pour formulaire enregistrement de la demande d'admission
        candidatAdmission: candidatAdmissionForm;
        anneeScolaire: anneesScolaires;
        classeSouhaitee: classes;
        motivation: string;
        //documentsJoint?: unDocumentForm[];
        parents: parentsForm[];
        vieAvecLesDeuxParents:boolean
    }

    export type demandeAdmission = { // pour demande admission recue du backend
        dateDemandeAdmission: Date;
        numeroDemande: string;
        candidatAdmission: candidatAdmissionForm;
        anneeScolaire: anneesScolaires;
        classeSouhaitee: classes;
        motivation: string;
        documentsJoint?: unDocument[];
        parents: parentsForm[];
        vieAvecLesdeuxParents: boolean;
    
    }

    export type admissionDetailsForm = { // utiliser pur le tableau comportant la lsite des demande d'admission
        dateNaissance:string;
        anneeScolaire:string;
        numeroDemande:string;
        demandeur:string;
        classeSollicitee: string;
        statut:string;
        dateDemande:string
        vieAvecLesdeuxParents: boolean;
    }

    export type parentType = { // pour parent recu du backend
        id: number;
        nom: string;
        prenoms: string;
        typeParent: string;
        numeroTelephone: string;
        courriel:string
    }

    export type parentsForm = { // pour formulaire enregistrement d'un parent
        nom: string;
        prenoms: string;
        typeParent: string | null;
        numeroTelephone: string;
        courriel:string
    }

    export type FiltreDemandeAdmission = {
        annee:string;
        classe:string;
        statut:string
    }

    export type decisionAdmission = {
        id:number;
        demandeAdmission: demandeAdmission;
        statut:string;
        necessiteAction:boolean;
        dateDecision:Date;
        dateLimiteAction:Date;
        commentaires:string;
    }

    export type utilisateurDto = {
        id: number;
        username: string;
        nom: string;
        prenoms: string;
        email: string;
        valideEmail: boolean;
        actif: boolean;
        telephone: string;
        role: string[];
    
    }

    export type UtilisateurForm = {
        nom:string;
        prenoms:string;
        username:string;
        email: string;
        telephone: string;
        password: string;
        role: string[];
    }
    
    export type etudiantForm = {
        matricule: string;
        utilisateur: UtilisateurForm;
    }
    
    export type oldStudentForm = {
        etudiant: etudiantForm;
        classe: classes;
        anneeScolaire: anneesScolaires; 
    }
        