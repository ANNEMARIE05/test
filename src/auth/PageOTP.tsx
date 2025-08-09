import { useState, useEffect } from "react";
import { Smartphone, RefreshCw, ArrowLeft, CheckCircle } from "lucide-react";
import { useSearchParams } from "react-router-dom";

export default function PageOTP() {
  const [codeOTP, setCodeOTP] = useState<string[]>(["", "", "", "", "", ""]);
  const [tempsRestant, setTempsRestant] = useState<number>(120); // 2 minutes
  const [codeEnvoye, setCodeEnvoye] = useState<boolean>(false);
  const [numeroTelephone] = useState<string>("+225 07 ** ** ** 45");
  const [erreurCode, setErreurCode] = useState<string>("");
  const [codeValide, setCodeValide] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [afficherMessageValidation, setAfficherMessageValidation] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const nextTarget = searchParams.get("next") ?? "/reinitialisation";

  // Formatage du temps restant
  const formaterTemps = (secondes: number) => {
    const minutes = Math.floor(secondes / 60);
    const secRestantes = secondes % 60;
    return `${minutes}:${secRestantes.toString().padStart(2, "0")}`;
  };

  // Minuteur
  useEffect(() => {
    if (tempsRestant > 0 && !codeValide) {
      const timer = setTimeout(() => setTempsRestant(tempsRestant - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [tempsRestant, codeValide]);

  // Gestion de la saisie du code OTP
  const gererSaisieOTP = (index: number, valeur: string) => {
    // Ne permettre que les chiffres
    if (!/^\d*$/.test(valeur)) return;

    const nouveauCode = [...codeOTP];
    nouveauCode[index] = valeur;
    setCodeOTP(nouveauCode);
    setErreurCode("");

    // Passer à l'input suivant si une valeur est saisie
    if (valeur && index < 5) {
      const nextInput = document.querySelector(`input[data-index="${index + 1}"]`) as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }

    // Vérifier si le code est complet
    if (nouveauCode.every(digit => digit !== "")) {
      const codeComplet = nouveauCode.join("");
      verifierCode(codeComplet);
    }
  };

  // Gestion de la suppression
  const gererSuppression = (index: number) => {
    if (codeOTP[index] === "" && index > 0) {
      // Si l'input actuel est vide et qu'on appuie sur backspace, aller à l'input précédent
      const prevInput = document.querySelector(`input[data-index="${index - 1}"]`) as HTMLInputElement;
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  // Gestion de la navigation avec les flèches
  const gererNavigation = (index: number, direction: 'left' | 'right') => {
    if (direction === 'left' && index > 0) {
      const prevInput = document.querySelector(`input[data-index="${index - 1}"]`) as HTMLInputElement;
      if (prevInput) {
        prevInput.focus();
      }
    } else if (direction === 'right' && index < 5) {
      const nextInput = document.querySelector(`input[data-index="${index + 1}"]`) as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  // Vérifier le code OTP
  const verifierCode = (code: string) => {
    setIsLoading(true);
    console.log("Vérification du code:", code);
    
    // Simulation de vérification (remplacer par votre logique)
    setTimeout(() => {
      if (code === "123456") {
        setCodeValide(true);
        setErreurCode("");
        setIsLoading(false);
        setAfficherMessageValidation(true);
        
        // Redirection après 2 secondes
        setTimeout(() => {
          window.location.href = nextTarget;
        }, 2000);
      } else {
        setErreurCode("Code incorrect. Veuillez réessayer.");
        setCodeOTP(["", "", "", "", "", ""]);
        setIsLoading(false);
        // Focus sur le premier input après une erreur
        setTimeout(() => {
          const firstInput = document.querySelector(`input[data-index="0"]`) as HTMLInputElement;
          if (firstInput) {
            firstInput.focus();
          }
        }, 100);
      }
    }, 1000);
  };

  // Renvoyer le code
  const renvoyerCode = () => {
    setTempsRestant(120);
    setCodeEnvoye(true);
    setErreurCode("");
    setCodeOTP(["", "", "", "", "", ""]);
    console.log("Nouveau code envoyé à:", numeroTelephone);
    
    // Animation de feedback
    setTimeout(() => setCodeEnvoye(false), 3000);
  };

  // Retour à la page précédente
  const retourPagePrecedente = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Éléments décoratifs animés */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-300 rounded-full opacity-15 animate-bounce" style={{animationDuration: '3s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-blue-400 rounded-full opacity-10 animate-ping" style={{animationDuration: '4s'}}></div>
      </div>

      {/* Conteneur principal */}
      <div className="relative w-full max-w-md">
        {/* Carte OTP */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 transform transition-all duration-500 hover:scale-105 hover:shadow-blue-200/50">
          
          {/* Bouton retour */}
          <button 
            onClick={retourPagePrecedente}
            className="mb-4 flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="text-sm">Retour</span>
          </button>

          {/* En-tête */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl mb-4 shadow-lg">
              <Smartphone className="w-8 h-8 text-white animate-pulse" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-2">
              Vérification
            </h1>
            <p className="text-gray-600 text-sm mb-2">
              Nous avons envoyé un code de vérification à
            </p>
            <p className="text-blue-600 font-semibold">
              {numeroTelephone}
            </p>
          </div>

          {!codeValide ? (
            <>
              {/* Champs de saisie OTP séparés */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
                  Saisissez le code à 6 chiffres
                </label>
                <div className="flex justify-center space-x-2 mb-6">
                  {codeOTP.map((digit, index) => (
                    <input
                      key={index}
                      data-index={index}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => gererSaisieOTP(index, e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Backspace') {
                          gererSuppression(index);
                        } else if (e.key === 'ArrowLeft') {
                          gererNavigation(index, 'left');
                        } else if (e.key === 'ArrowRight') {
                          gererNavigation(index, 'right');
                        }
                      }}
                      className={`w-12 h-12 text-center text-xl font-bold border-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        erreurCode 
                          ? "border-red-300 bg-red-50 text-red-600" 
                          : digit 
                            ? "border-blue-500 bg-blue-50 text-blue-700" 
                            : "border-gray-200 bg-gray-50 hover:border-blue-300"
                      }`}
                      placeholder=""
                      disabled={isLoading}
                    />
                  ))}
                </div>
              </div>

              {/* Message d'erreur */}
              {erreurCode && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm text-center animate-pulse">
                  {erreurCode}
                </div>
              )}

              {/* Message de renvoi */}
              {codeEnvoye && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm text-center animate-pulse">
                  Nouveau code envoyé avec succès !
                </div>
              )}

              {/* Minuteur et renvoi */}
              <div className="text-center mb-6">
                {tempsRestant > 0 ? (
                  <div className="text-gray-600 text-sm mb-3">
                    Code expire dans{" "}
                    <span className="font-mono font-bold text-blue-600">
                      {formaterTemps(tempsRestant)}
                    </span>
                  </div>
                ) : null}
                
                <button
                  onClick={renvoyerCode}
                  disabled={tempsRestant > 0 || isLoading}
                  className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    tempsRestant > 0 || isLoading
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                  }`}
                >
                  <RefreshCw className={`w-4 h-4 ${tempsRestant <= 0 && !isLoading ? "hover:rotate-180 transition-transform duration-500" : ""}`} />
                  <span>Renvoyer le code</span>
                </button>
              </div>
            </>
          ) : null}

          {/* Message de validation réussie */}
          {afficherMessageValidation && (
            <div className="text-center mb-8 animate-pulse">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                <CheckCircle className="w-10 h-10 text-green-500 animate-bounce" />
              </div>
              <h2 className="text-2xl font-bold text-green-700 mb-2">Code validé !</h2>
              <p className="text-gray-600 text-sm mb-4">
                Votre numéro de téléphone a été vérifié avec succès.
              </p>
              <div className="text-xs text-gray-500">
                Redirection automatique...
              </div>
            </div>
          )}

          {/* Ligne décorative */}
          <div className="mt-8 flex items-center">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            <div className="px-4 text-xs text-gray-500 bg-white rounded-full">Sécurisé</div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>
        </div>

        {/* Pied de page */}
        <div className="text-center mt-6 text-sm text-gray-500">
          © 2025 OCR Platform. Tous droits réservés.
        </div>
      </div>
    </div>
  );
}