# Composants Réutilisables

Ce dossier contient les composants réutilisables pour l'application OCR.

## 📁 Structure des composants

### `Layout.tsx`
Composant principal qui combine la sidebar et le header pour créer une structure cohérente.

**Props :**
- `children`: Contenu à afficher
- `activeSection`: Section active actuelle
- `onSectionChange`: Fonction appelée lors du changement de section
- `onLogout`: Fonction de déconnexion
- `sidebarItems`: Items personnalisés pour la sidebar (optionnel)
- `title`: Titre de l'application (défaut: "OCR")
- `headerTitle`: Titre du header (optionnel)
- `user`: Informations de l'utilisateur (optionnel)

**Exemple d'utilisation :**
```tsx
import Layout from './components/Layout';

<Layout
  activeSection={activeSection}
  onSectionChange={setActiveSection}
  onLogout={handleLogout}
  title="OCR"
  headerTitle="Tableau de bord"
  user={{ name: "Administrateur" }}
>
  <div>Contenu de la page</div>
</Layout>
```

### `Sidebar.tsx`
Composant de navigation latérale réutilisable.

**Props :**
- `isOpen`: État d'ouverture de la sidebar
- `onClose`: Fonction de fermeture
- `activeSection`: Section active
- `onSectionChange`: Fonction de changement de section
- `onLogout`: Fonction de déconnexion
- `items`: Items de navigation personnalisés (optionnel)
- `title`: Titre de l'application

**Exemple d'utilisation :**
```tsx
import Sidebar, { SidebarItem } from './components/Sidebar';

const items: SidebarItem[] = [
  { id: 'dashboard', label: 'Tableau de bord', icon: <DashboardIcon /> },
  { id: 'users', label: 'Utilisateurs', icon: <UsersIcon /> },
];

<Sidebar
  isOpen={sidebarOpen}
  onClose={handleClose}
  activeSection={activeSection}
  onSectionChange={handleSectionChange}
  onLogout={handleLogout}
  items={items}
  title="OCR"
/>
```

### `Header.tsx`
Composant d'en-tête réutilisable.

**Props :**
- `onMenuClick`: Fonction appelée lors du clic sur le menu
- `title`: Titre du header
- `user`: Informations de l'utilisateur

**Exemple d'utilisation :**
```tsx
import Header from './components/Header';

<Header
  onMenuClick={handleMenuClick}
  title="Tableau de bord"
  user={{ name: "Administrateur" }}
/>
```

## 🎨 Design System

### Couleurs
- **Primaire**: Bleu (`blue-500`, `blue-600`, `blue-700`)
- **Fond**: Gris clair (`gray-50`)
- **Cartes**: Blanc (`white`)
- **Bordures**: Gris (`gray-200`)

### Espacements
- **Padding**: `p-4 sm:p-6 lg:p-8`
- **Gap**: `gap-6`
- **Margin**: `space-y-6`

### Ombres
- **Légère**: `shadow-sm`
- **Moyenne**: `shadow-md`
- **Forte**: `shadow-xl`

## 📱 Responsive Design

Tous les composants sont conçus pour être responsive :
- **Mobile**: Sidebar en overlay avec menu hamburger
- **Tablette**: Adaptation automatique
- **Desktop**: Sidebar fixe avec header aligné

## 🔄 Transitions

Les composants incluent des transitions fluides :
- **Durée**: `duration-200` ou `duration-300`
- **Easing**: `ease-in-out`
- **Propriétés**: `transition-all`, `transition-colors`, `transition-shadow`

## 🎯 Utilisation recommandée

1. **Pour les dashboards admin** : Utilisez `Layout` avec les items par défaut
2. **Pour les dashboards utilisateur** : Utilisez `Layout` avec des items personnalisés
3. **Pour les pages simples** : Utilisez `Header` et `Sidebar` séparément
4. **Pour les pages complexes** : Créez un nouveau composant basé sur `Layout` 