## Aplikacja finansowa „Finanse+”


## Opis
- Projekt Finanse+ to aplikacja mobilna do zarządzania budżetem osobistym i analizą wydatków.
- Użytkownik może planować budżet, rejestrować przychody oraz wydatki,
- śledzić cele oszczędnościowe i pilnować terminów płatności.
---

## Architektura
- **Aplikacja mobilna** – interfejs użytkownika
- **Baza danych** – przechowywanie danych
- **Web Service (Backend)** – logika biznesowa i API

- Uzywane są **REST API** z **HTTPS** i formatu **JSON**.


---

## Funkcjonalności
- Rejestracja i logowanie
- Wirtualne konto oraz dodawanie przychodów
- Rejestrowanie wydatków z kategoriami
- Cele oszczędnościowe z możliwością odkładania środków
- Przypomnienia o płatnościach
- Historia operacji i podsumowanie budżetu

---

## Backend – odpowiedzialności
- Autoryzacja i uwierzytelnianie użytkowników
- Walidacja danych wejściowych
- Przetwarzanie przychodów, wydatków i celów oszczędnościowych
- Zarządzanie danymi w bazie danych

---

## Baza danych SQLite
Aplikacja korzysta z relacyjnej bazy danych przechowującej:
- użytkowników
- salda portfeli (PLN)
- historię operacji finansowych
- cele oszczędnościowe i przypomnienia płatności

---

## Instalacja i uruchomienie

### Wymagania
- Node.js (LTS)
- npm
- Expo CLI
- PowerShell

### Instalacja zależności
- W katalogu "mobile" projektu:
- cd mobile
- npm install

### Uruchomienie backendu (terminal 1)

- cd server >
- node app.js

### Uruchomienie aplikacji mobilnej (terminal 2)

- cd mobile >
- npm start



<p align="center">
  <img src="screenshots/s0.png" width="150" />
  <img src="screenshots/s01.png" width="150" />
  <img src="screenshots/s02.png" width="150" />
  <img src="screenshots/s03.png" width="150" />
  <img src="screenshots/s04.png" width="150" />
  <img src="screenshots/s05.png" width="150" />
  <img src="screenshots/s06.png" width="150" />
  <img src="screenshots/s07.png" width="150" />
</p>
