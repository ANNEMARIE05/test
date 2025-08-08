import { 
  MessageCircle,
} from "lucide-react";

export default function Assistance() {
    return (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Assistance</h2>
            <p className="text-gray-600">Centre d'aide et support utilisateur</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MessageCircle className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Support en ligne</h3>
              </div>
              <p className="text-gray-600">Besoin d'aide ? Notre équipe est là pour vous accompagner.</p>
              <div className="space-y-3">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">FAQ</h4>
                  <p className="text-sm text-gray-600">Consultez nos questions fréquemment posées</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Contact</h4>
                  <p className="text-sm text-gray-600">Contactez notre équipe support</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Documentation</h4>
                  <p className="text-sm text-gray-600">Guide d'utilisation et tutoriels</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}