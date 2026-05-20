from django.db import models
from django.db.models.signals import post_delete, pre_save
from django.dispatch import receiver

# Create your models here.
class Categoria(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    estado = models.BooleanField(default=True)

class Producto(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField()
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)  # Relación aquí
    estado = models.BooleanField(default=True)
    img = models.ImageField(upload_to='productos/', blank=True)

    def delete(self, *args, **kwargs):
        image_name = self.img.name if self.img else None
        super().delete(*args, **kwargs)
        if image_name:
            try:
                self.img.storage.delete(image_name)
            except Exception:
                pass


@receiver(post_delete, sender=Producto)
def delete_producto_image(sender, instance, **kwargs):
    if instance.img:
        try:
            instance.img.delete(save=False)
        except Exception:
            pass


@receiver(pre_save, sender=Producto)
def delete_old_producto_image(sender, instance, **kwargs):
    if not instance.pk:
        return

    try:
        old_instance = Producto.objects.get(pk=instance.pk)
    except Producto.DoesNotExist:
        return

    old_file = old_instance.img
    new_file = instance.img
    if old_file and old_file != new_file:
        try:
            old_file.delete(save=False)
        except Exception:
            pass