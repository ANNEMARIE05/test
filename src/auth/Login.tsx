import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Shield } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [motDePasse, setMotDePasse] = useState<string>("");
  const [afficherMotDePasse, setAfficherMotDePasse] = useState<boolean>(false);
  const [modeReinitialisation, setModeReinitialisation] = useState<boolean>(false);
  const [messageEnvoi, setMessageEnvoi] = useState<string>("");
  const [erreur, setErreur] = useState<string>("");
  const [erreurMotDePasse, setErreurMotDePasse] = useState<string>("");

  const validerMotDePasse = (motDePasse: string) => {
    if (motDePasse.length < 8) {
      return "Le mot de passe doit contenir au moins 8 caractères";
    }
    if (!/[A-Z]/.test(motDePasse)) {
      return "Le mot de passe doit contenir au moins une lettre majuscule";
    }
    if (!/[a-z]/.test(motDePasse)) {
      return "Le mot de passe doit contenir au moins une lettre minuscule";
    }
    if (!/\d/.test(motDePasse)) {
      return "Le mot de passe doit contenir au moins un chiffre";
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(motDePasse)) {
      return "Le mot de passe doit contenir au moins un caractère spécial";
    }
    return "";
  };

  const gererConnexion = () => {
    setErreur("");
    if (!email || !motDePasse) {
      setErreur("Veuillez remplir tous les champs");
      return;
    }
    
    const validationMotDePasse = validerMotDePasse(motDePasse);
    if (validationMotDePasse) {
      setErreurMotDePasse(validationMotDePasse);
      return;
    }
    
    if(email === "admin@gmail.com" && motDePasse === "Admin123@") {
      localStorage.setItem("redirectAfterOTP", "/admin");
      window.location.href = "/otp";
    } else if(email === "user@gmail.com" && motDePasse === "User123@") {
      localStorage.setItem("redirectAfterOTP", "/user");
      window.location.href = "/otp";
    } else {
      setErreur("Email ou mot de passe incorrect");
    }
  };

  const gererReinitialisation = () => {
    if (!email) {
      setErreur("Veuillez saisir votre adresse email");
      return;
    }
    
    setMessageEnvoi("Un code de réinitialisation OTP a été envoyé à votre adresse email.");
    console.log("Réinitialisation pour:", email);
    localStorage.setItem("redirectAfterOTP", "/reinitialisation");
    window.location.href = "/otp";
  };

  const basculerAffichageMotDePasse = () => {
    setAfficherMotDePasse(!afficherMotDePasse);
  };

  const basculerModeReinitialisation = () => {
    setModeReinitialisation(!modeReinitialisation);
    setMessageEnvoi("");
    setErreur("");
    setErreurMotDePasse("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-300 rounded-full opacity-15 animate-bounce" style={{animationDuration: '3s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-blue-400 rounded-full opacity-10 animate-ping" style={{animationDuration: '4s'}}></div>
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 transform transition-all duration-500 hover:scale-105 hover:shadow-blue-200/50">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl mb-4 shadow-lg animate-pulse">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-2">
              OCR
            </h1>
            <p className="text-gray-600 text-sm">
              {modeReinitialisation ? "Réinitialiser votre mot de passe" : "Bienvenue de retour"}
            </p>
          </div>

          <div className="space-y-6">
            <div className="relative">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Adresse email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-gray-50"
                  placeholder="votreemail@exemple.com"
                  required
                />
              </div>
            </div>

            {!modeReinitialisation && (
              <div className="relative">
                <label htmlFor="motdepasse" className="block text-sm font-medium text-gray-700 mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400" />
                  <input
                    id="motdepasse"
                    type={afficherMotDePasse ? "text" : "password"}
                    value={motDePasse}
                    onChange={(e) => {
                      setMotDePasse(e.target.value);
                      setErreurMotDePasse(validerMotDePasse(e.target.value));
                    }}
                    className="w-full pl-12 pr-12 py-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-gray-50"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={basculerAffichageMotDePasse}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors duration-200"
                  >
                    {afficherMotDePasse ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {erreurMotDePasse && (
                  <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs animate-pulse">
                    {erreurMotDePasse}
                  </div>
                )}
              </div>
            )}

            {erreur && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm animate-pulse">
                {erreur}
              </div>
            )}

            {messageEnvoi && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm animate-pulse">
                {messageEnvoi}
              </div>
            )}

            <button
              onClick={modeReinitialisation ? gererReinitialisation : gererConnexion}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:from-blue-600 hover:to-blue-700 transform transition-all duration-300 hover:scale-105 hover:shadow-blue-300/50 flex items-center justify-center space-x-2 group"
            >
              <span>{modeReinitialisation ? "Envoyer le code" : "Se connecter"}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={basculerModeReinitialisation}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-200 hover:underline"
            >
              {modeReinitialisation ? "← Retour à la connexion" : "Mot de passe oublié ?"}
            </button>
          </div>

          <div className="mt-8 flex items-center">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
            <div className="px-4 text-xs text-gray-500 bg-white rounded-full">OCR Platform</div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>
        </div>

        <div className="text-center mt-6 text-sm text-gray-500">
          © 2025 OCR Platform. Tous droits réservés.
        </div>
      </div>
    </div>
  );
}