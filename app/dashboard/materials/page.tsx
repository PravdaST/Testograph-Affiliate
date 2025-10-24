'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  FileText,
  Image as ImageIcon,
  Copy,
  Download,
  Check,
  Loader2,
  Video,
} from 'lucide-react';

interface Material {
  id: string;
  title: string;
  description: string;
  type: 'banner' | 'social-post' | 'sales-guide' | 'video';
  file_url?: string;
  content?: string;
  created_at: string;
}

export default function MaterialsPage() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/materials');
      const data = await response.json();
      if (response.ok) {
        setMaterials(data.materials || []);
      }
    } catch (error) {
      console.error('Error fetching materials:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const banners = materials.filter(m => m.type === 'banner');
  const socialPosts = materials.filter(m => m.type === 'social-post');
  const guides = materials.filter(m => m.type === 'sales-guide');
  const videos = materials.filter(m => m.type === 'video');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Маркетинг Материали</h1>
        <p className="text-muted-foreground mt-1">
          Готови материали за промоция на Testograph продуктите
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="banners" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="banners">
            <ImageIcon className="h-4 w-4 mr-2" />
            Банери
          </TabsTrigger>
          <TabsTrigger value="social">
            <Copy className="h-4 w-4 mr-2" />
            Social Posts
          </TabsTrigger>
          <TabsTrigger value="guides">
            <FileText className="h-4 w-4 mr-2" />
            Гайдове
          </TabsTrigger>
          <TabsTrigger value="videos">
            <Video className="h-4 w-4 mr-2" />
            Видеа
          </TabsTrigger>
        </TabsList>

        {/* Banners */}
        <TabsContent value="banners" className="space-y-4">
          {banners.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-lg font-semibold">Все още няма банери</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Скоро ще добавим готови визуални материали
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {banners.map((material) => (
                <Card key={material.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{material.title}</CardTitle>
                    <CardDescription>{material.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {material.file_url && (
                      <div className="aspect-video bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                        <img
                          src={material.file_url}
                          alt={material.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <Button variant="outline" className="w-full" asChild>
                      <a href={material.file_url} download>
                        <Download className="h-4 w-4 mr-2" />
                        Свали
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Social Posts */}
        <TabsContent value="social" className="space-y-4">
          {socialPosts.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Copy className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-lg font-semibold">Готови текстове за социалните мрежи</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Използвай тези готови текстове за твоите публикации
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {socialPosts.map((material) => (
                <Card key={material.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{material.title}</CardTitle>
                        <CardDescription>{material.description}</CardDescription>
                      </div>
                      <Badge>Instagram/Facebook</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm whitespace-pre-wrap">{material.content}</p>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => handleCopy(material.content || '', material.id)}
                    >
                      {copiedId === material.id ? (
                        <>
                          <Check className="h-4 w-4 mr-2 text-green-600" />
                          Копирано!
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-2" />
                          Копирай текста
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Guides */}
        <TabsContent value="guides" className="space-y-4">
          {guides.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-lg font-semibold">Sales гайдове и ръководства</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Научи как да продаваш по-ефективно
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {guides.map((material) => (
                <Card key={material.id}>
                  <CardHeader>
                    <CardTitle>{material.title}</CardTitle>
                    <CardDescription>{material.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full" asChild>
                      <a href={material.file_url} download target="_blank" rel="noopener noreferrer">
                        <Download className="h-4 w-4 mr-2" />
                        Свали PDF
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Videos */}
        <TabsContent value="videos" className="space-y-4">
          {videos.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Video className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-lg font-semibold">Промо видеа</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Готови видеа за споделяне
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {videos.map((material) => (
                <Card key={material.id}>
                  <CardHeader>
                    <CardTitle>{material.title}</CardTitle>
                    <CardDescription>{material.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {material.file_url && (
                      <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                        <video
                          src={material.file_url}
                          controls
                          className="w-full h-full"
                        >
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    )}
                    <Button variant="outline" className="w-full" asChild>
                      <a href={material.file_url} download>
                        <Download className="h-4 w-4 mr-2" />
                        Свали видео
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Info Card */}
      <Card className="bg-muted">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-2">💡 Съвети за използване</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Винаги включвай твоя уникален промо код в публикациите</li>
            <li>• Адаптирай текстовете към твоята аудитория и стил</li>
            <li>• Комбинирай различни материали за по-добри резултати</li>
            <li>• Проследявай кои материали работят най-добре за теб</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
