// Importar el componente de navegación
import GalleryNav from "@/components/gallery-nav"

export default function Gallery() {
  return (
    <div className="container mx-auto p-4">
      <h1>Gallery Page</h1>
      {/* rest of the gallery page content */}
      <GalleryNav />
    </div>
  )
}
