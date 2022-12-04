(function() {
    $(function() {
      var $document, death, enterDuelMode, enterOutro, noHonor, reset, resetMessages, restart, showDuelInfo, startButtonOS, win;
      $document = $(document);
      this.$body = $document.find("body");
      
      // opening screen -----------------------------
      this.$openingScreen = $document.find(".js-opening");
      this.$playScreen = $document.find(".js-play");
      this.$startButtonOS = this.$openingScreen.find(".js-start");
      this.$messageOS = this.$openingScreen.find(".js-message");
      startButtonOS = () => {
        this.$startButtonOS.addClass("is-hidden");
        this.$messageOS.removeClass("is-hidden");
        return this.$openingScreen.addClass("has-message");
      };
      this.$startButtonOS.on("click", () => {
        return startButtonOS();
      });
      this.$continueButtonOS = this.$openingScreen.find(".js-continue");
      this.$continueButtonOS.on("click", () => {
        this.$openingScreen.addClass("is-hidden");
        this.$playScreen.removeClass("is-hidden");
        this.$openingScreen.removeClass("has-message");
        return showDuelInfo();
      });
      
      // play screen -----------------------------  
      this.$messagePS = this.$playScreen.find(".js-message");
      this.$duelButton = $document.find(".js-duel");
      this.$drawButton = $document.find(".js-draw");
      this.$sheriff = $document.find(".js-sheriff");
      this.$opponent = $document.find(".js-opponent");
      this.$resultPS = $document.find(".js-result");
      this.result;
      this.$timer;
      this.dueling = false;
      this.level = 1;
      this.gameOver = false;
      this.noHonor = 1;
      this.totalTime = 0;
      restart = () => {
        // completely restarts game
        this.level = 1;
        this.noHonor = 0;
        this.dueling = false;
        this.gameOver = false;
        this.totalTime = 0;
        resetMessages();
        this.$outroScreen.addClass("is-hidden");
        this.$playScreen.addClass("is-hidden");
        this.$openingScreen.removeClass("is-hidden");
        this.$startButtonOS.removeClass("is-hidden");
        this.$messageOS.addClass("is-hidden");
        this.$body.removeClass("game-over");
        this.$body.removeClass("game-end");
        this.$sheriff.removeClass("is-dead");
        return this.$sheriff.removeClass("is-gone");
      };
      death = () => {
        this.totalTime = 0;
        this.$opponent.addClass("is-shooting");
        this.$sheriff.addClass("is-dead");
        return setTimeout((() => {
          this.$sheriff.addClass("is-gone");
          this.$opponent.removeClass("is-shooting");
          this.$resultPS.html("Game Over");
          this.$duelButton.removeClass("is-hidden");
          this.level = 1;
          this.gameOver = true;
          this.$body.addClass("game-over");
        }), 200);
      };
      win = () => {
        this.totalTime = this.totalTime + this.result;
        this.$sheriff.addClass("is-shooting");
        this.$opponent.addClass("is-dead");
        this.$resultPS.html("Justicia servida en " + this.result.toFixed(3) + " segundos");
        this.level++;
        this.$resultContinue.removeClass("is-hidden");
        setTimeout((() => {
          this.$sheriff.removeClass("is-shooting");
          this.$sheriff.addClass("is-armed");
        }), 200);
        return setTimeout((() => {
          this.$sheriff.removeClass("is-armed");
        }), 1000);
      };
      this.$resultContinue = $document.find(".js-result-continue");
      this.$resultContinue.on("click", () => {
        this.$resultContinue.addClass("is-hidden");
        resetMessages();
        // if won the game
        if (this.level === 4) {
          return enterOutro();
        } else {
          // continue as normal
          return showDuelInfo();
        }
      });
      reset = () => {
        // stops game if no reaction
        death();
        clearInterval(this.$timer);
        this.$duelButton.removeClass("is-hidden");
        return this.$drawButton.addClass("is-hidden");
      };
      showDuelInfo = () => {
        this.$opponent.removeClass("is-armed");
        this.$opponent.removeClass("is-dead");
        this.$opponent.removeClass("opponent--1");
        this.$opponent.removeClass("opponent--2");
        this.$opponent.removeClass("opponent--3");
        this.$opponent.addClass("opponent--" + this.level);
        switch (this.level) {
          case 3:
            this.$messagePS.html("Big Gilly Boulder anhela el trabajo de azotar a un chorro como tú. ¡Es un artista hábil en el sorteo! Cuidado");
            break;
          case 2:
            this.$messagePS.html("Se llama Goldie Gaia. Ella dirige el salón incluso si tiene que enviarte al depósito de huesos con las botas puestas.");
            break;
          default:
            this.$messagePS.html("Pumpgun Ed no es un hombre con el que jugar. Imagínese, este tipo grande yace yuh 'cruza el enganche y' fan yuh a un frazzle");
        }
        return this.$duelButton.removeClass("is-hidden");
      };
      resetMessages = () => {
        this.$messagePS.html("");
        return this.$resultPS.html("");
      };
      enterDuelMode = () => {
        this.$duelButton.addClass("is-hidden");
        this.$drawButton.removeClass("is-hidden");
        resetMessages();
        this.delay = (Math.floor(Math.random() * (6 - 1) + 1)) * 1000;
        // start duel
        return this.$duel = setTimeout((() => {
          var startTime;
          this.dueling = true;
          // style start
          this.$opponent.addClass("is-armed");
          // start timer
          startTime = Date.now();
          return this.$timer = setInterval((() => {
            var elapsedTime;
            elapsedTime = Date.now() - startTime;
            // announce result
            this.result = elapsedTime / 1000;
            if (this.result > 2) {
              reset();
            }
          }), 10);
        }), this.delay);
      };
      noHonor = () => {
        var noHonorMessage, random;
        // if clicked to early
        clearInterval(this.$duel);
        this.$duelButton.removeClass("is-hidden");
        this.$drawButton.addClass("is-hidden");
        switch (this.noHonor) {
          case 1:
            noHonorMessage = "No querrás ser demasiado repentino con el trío. Primero tienen que dibujar.";
            this.noHonor++;
            break;
          case 2:
            noHonorMessage = "Seguro que estás jugando con suerte. Será mejor que vayas y recojas tus mantas.";
            this.noHonor++;
            break;
          default:
            random = Math.floor(Math.random() * (4 - 1)) + 1;
            switch (random) {
              case 1:
                noHonorMessage = "¡Mezclándolo con alguna oportunidad! ¡Y a esta hora del día!";
                break;
              case 2:
                noHonorMessage = "Sucedió un poco repentino, ¿no?";
                break;
              default:
                noHonorMessage = "¡Qué diablos! ¿Qué clase de cosa no muestra honor en un sorteo rápido?";
            }
        }
        return this.$resultPS.html(noHonorMessage);
      };
      
      // Duel button
      this.$duelButton.on("click", () => {
        if (this.gameOver) {
          return restart();
        } else {
          return enterDuelMode();
        }
      });
      // Draw button
      this.$drawButton.on("click", () => {
        if (this.dueling) {
          // good draw
          clearInterval(this.$timer);
          this.$opponent.removeClass("is-armed");
          this.$drawButton.addClass("is-hidden");
          switch (this.level) {
            case 3:
              if (this.result < 0.33) {
                win();
              } else {
                death();
              }
              break;
            case 2:
              if (this.result < 0.4) {
                win();
              } else {
                death();
              }
              break;
            default:
              if (this.result < 2) {
                win();
              } else {
                death();
              }
          }
        } else {
          // failed draw
          noHonor();
        }
        return this.dueling = false;
      });
      
      // Outro screen -----------------------------  
      this.$outroScreen = $document.find(".js-outro");
      this.$saveAndQuitButton = this.$outroScreen.find(".js-save-and-quit");
      this.$totalTime = this.$outroScreen.find(".js-total-time");
      enterOutro = () => {
        this.$totalTime.html("Total time: " + this.totalTime.toFixed(3) + "seconds");
        this.$playScreen.addClass("is-hidden");
        this.$outroScreen.removeClass("is-hidden");
        this.$body.addClass("game-end");
        return this.$totalTime = 0;
      };
      return this.$saveAndQuitButton.on("click", () => {
        return restart();
      });
    });
  
  }).call(this);
  
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiPGFub255bW91cz4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFBQSxDQUFBLENBQUUsUUFBQSxDQUFBLENBQUE7QUFDRixRQUFBLFNBQUEsRUFBQSxLQUFBLEVBQUEsYUFBQSxFQUFBLFVBQUEsRUFBQSxPQUFBLEVBQUEsS0FBQSxFQUFBLGFBQUEsRUFBQSxPQUFBLEVBQUEsWUFBQSxFQUFBLGFBQUEsRUFBQTtJQUFFLFNBQUEsR0FBWSxDQUFBLENBQUcsUUFBSDtJQUNaLElBQUMsQ0FBQSxLQUFELEdBQVMsU0FBUyxDQUFDLElBQVYsQ0FBZSxNQUFmLEVBRFg7OztJQUlFLElBQUMsQ0FBQSxjQUFELEdBQWtCLFNBQVMsQ0FBQyxJQUFWLENBQWUsYUFBZjtJQUNsQixJQUFDLENBQUEsV0FBRCxHQUFlLFNBQVMsQ0FBQyxJQUFWLENBQWUsVUFBZjtJQUVmLElBQUMsQ0FBQSxjQUFELEdBQWtCLElBQUMsQ0FBQSxjQUFjLENBQUMsSUFBaEIsQ0FBcUIsV0FBckI7SUFDbEIsSUFBQyxDQUFBLFVBQUQsR0FBYyxJQUFDLENBQUEsY0FBYyxDQUFDLElBQWhCLENBQXFCLGFBQXJCO0lBRWQsYUFBQSxHQUFnQixDQUFBLENBQUEsR0FBQTtNQUNkLElBQUMsQ0FBQSxjQUFjLENBQUMsUUFBaEIsQ0FBeUIsV0FBekI7TUFDQSxJQUFDLENBQUEsVUFBVSxDQUFDLFdBQVosQ0FBd0IsV0FBeEI7YUFDQSxJQUFDLENBQUEsY0FBYyxDQUFDLFFBQWhCLENBQXlCLGFBQXpCO0lBSGM7SUFJaEIsSUFBQyxDQUFBLGNBQWMsQ0FBQyxFQUFoQixDQUFtQixPQUFuQixFQUE0QixDQUFBLENBQUEsR0FBQTthQUFHLGFBQUEsQ0FBQTtJQUFILENBQTVCO0lBRUEsSUFBQyxDQUFBLGlCQUFELEdBQXFCLElBQUMsQ0FBQSxjQUFjLENBQUMsSUFBaEIsQ0FBcUIsY0FBckI7SUFDckIsSUFBQyxDQUFBLGlCQUFpQixDQUFDLEVB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YUFBQSxNQUFBO2NBR0UsS0FBQSxDQUFBLEVBSEY7O0FBWkosU0FMRjtPQUFBLE1BQUE7O1FBdUJFLE9BQUEsQ0FBQSxFQXZCRjs7YUF3QkEsSUFBQyxDQUFBLE9BQUQsR0FBVztJQXpCWSxDQUF6QixFQXZMRjs7O0lBbU5FLElBQUMsQ0FBQSxZQUFELEdBQWdCLFNBQVMsQ0FBQyxJQUFWLENBQWUsV0FBZjtJQUNoQixJQUFDLENBQUEsa0JBQUQsR0FBc0IsSUFBQyxDQUFBLFlBQVksQ0FBQyxJQUFkLENBQW1CLG1CQUFuQjtJQUN0QixJQUFDLENBQUEsVUFBRCxHQUFjLElBQUMsQ0FBQSxZQUFZLENBQUMsSUFBZCxDQUFtQixnQkFBbkI7SUFDZCxVQUFBLEdBQWEsQ0FBQSxDQUFBLEdBQUE7TUFDWCxJQUFDLENBQUEsVUFBVSxDQUFDLElBQVosQ0FBaUIsY0FBQSxHQUFpQixJQUFDLENBQUEsU0FBUyxDQUFDLE9BQVgsQ0FBbUIsQ0FBbkIsQ0FBakIsR0FBeUMsU0FBMUQ7TUFDQSxJQUFDLENBQUEsV0FBVyxDQUFDLFFBQWIsQ0FBc0IsV0FBdEI7TUFDQSxJQUFDLENBQUEsWUFBWSxDQUFDLFdBQWQsQ0FBMEIsV0FBMUI7TUFDQSxJQUFDLENBQUEsS0FBSyxDQUFDLFFBQVAsQ0FBZ0IsVUFBaEI7YUFDQSxJQUFDLENBQUEsVUFBRCxHQUFjO0lBTEg7V0FPYixJQUFDLENBQUEsa0JBQW1CLENBQUMsRUFBckIsQ0FBd0IsT0FBeEIsRUFBaUMsQ0FBQSxDQUFBLEdBQUE7YUFDL0IsT0FBQSxDQUFBO0lBRCtCLENBQWpDO0VBOU5BLENBQUY7QUFBQSIsInNvdXJjZXNDb250ZW50IjpbIiQgLT5cbiAgJGRvY3VtZW50ID0gJCAoZG9jdW1lbnQpXG4gIEAkYm9keSA9ICRkb2N1bWVudC5maW5kIFwiYm9keVwiICBcbiAgICBcbiMgb3BlbmluZyBzY3JlZW4gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgQCRvcGVuaW5nU2NyZWVuID0gJGRvY3VtZW50LmZpbmQgXCIuanMtb3BlbmluZ1wiXG4gIEAkcGxheVNjcmVlbiA9ICRkb2N1bWVudC5maW5kIFwiLmpzLXBsYXlcIlxuICBcbiAgQCRzdGFydEJ1dHRvbk9TID0gQCRvcGVuaW5nU2NyZWVuLmZpbmQgXCIuanMtc3RhcnRcIlxuICBAJG1lc3NhZ2VPUyA9IEAkb3BlbmluZ1NjcmVlbi5maW5kIFwiLmpzLW1lc3NhZ2VcIlxuICBcbiAgc3RhcnRCdXR0b25PUyA9ID0+XG4gICAgQCRzdGFydEJ1dHRvbk9TLmFkZENsYXNzIFwiaXMtaGlkZGVuXCJcbiAgICBAJG1lc3NhZ2VPUy5yZW1vdmVDbGFzcyBcImlzLWhpZGRlblwiXG4gICAgQCRvcGVuaW5nU2NyZWVuLmFkZENsYXNzIFwiaGFzLW1lc3NhZ2VcIlxuICBAJHN0YXJ0QnV0dG9uT1Mub24gXCJjbGlja1wiLCA9PiBzdGFydEJ1dHRvbk9TKClcbiAgXG4gIEAkY29udGludWVCdXR0b25PUyA9IEAkb3BlbmluZ1NjcmVlbi5maW5kIFwiLmpzLWNvbnRpbnVlXCJcbiAgQCRjb250aW51ZUJ1dHRvbk9TLm9uIFwiY2xpY2tcIiwgPT5cbiAgICBAJG9wZW5pbmdTY3JlZW4uYWRkQ2xhc3MgXCJpcy1oaWRkZW5cIlxuICAgIEAkcGxheVNjcmVlbi5yZW1vdmVDbGFzcyBcImlzLWhpZGRlblwiXG4gICAgQCRvcGVuaW5nU2NyZWVuLnJlbW92ZUNsYXNzIFwiaGFzLW1lc3NhZ2VcIlxuICAgIHNob3dEdWVsSW5mbygpXG4gXG4jIHBsYXkgc2NyZWVuIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICBcbiAgXG4gIEAkbWVzc2FnZVBTID0gQCRwbGF5U2NyZWVuLmZpbmQgXCIuanMtbWVzc2FnZVwiXG4gIEAkZHVlbEJ1dHRvbiA9ICRkb2N1bWVudC5maW5kIFwiLmpzLWR1ZWxcIlxuICBAJGRyYXdCdXR0b24gPSAkZG9jdW1lbnQuZmluZCBcIi5qcy1kcmF3XCJcbiAgQCRzaGVyaWZmID0gJGRvY3VtZW50LmZpbmQgXCIuanMtc2hlcmlmZlwiXG4gIEAkb3Bwb25lbnQgPSAkZG9jdW1lbnQuZmluZCBcIi5qcy1vcHBvbmVudFwiXG4gIEAkcmVzdWx0UFMgPSAkZG9jdW1lbnQuZmluZCBcIi5qcy1yZXN1bHRcIlxuICBAcmVzdWx0XG4gIEAkdGltZXJcbiAgQGR1ZWxpbmcgPSBmYWxzZVxuICBAbGV2ZWwgPSAxXG4gIEBnYW1lT3ZlciA9IGZhbHNlXG4gIEBub0hvbm9yID0gMVxuICBAdG90YWxUaW1lID0gMFxuICBcbiAgcmVzdGFydCA9ID0+XG4gICAgIyBjb21wbGV0ZWx5IHJlc3RhcnRzIGdhbWVcbiAgICBAbGV2ZWwgPSAxXG4gICAgQG5vSG9ub3IgPSAwXG4gICAgQGR1ZWxpbmcgPSBmYWxzZVxuICAgIEBnYW1lT3ZlciA9IGZhbHNlXG4gICAgQHRvdGFsVGltZSA9IDBcbiAgICByZXNldE1lc3NhZ2VzKClcbiAgICBAJG91dHJvU2NyZWVuLmFkZENsYXNzIFwiaXMtaGlkZGVuXCJcbiAgICBAJHBsYXlTY3JlZW4uYWRkQ2xhc3MgXCJpcy1oaWRkZW5cIlxuICAgIEAkb3BlbmluZ1NjcmVlbi5yZW1vdmVDbGFzcyBcImlzLWhpZGRlblwiXG4gICAgQCRzdGFydEJ1dHRvbk9TLnJlbW92ZUNsYXNzIFwiaXMtaGlkZGVuXCJcbiAgICBAJG1lc3NhZ2VPUy5hZGRDbGFzcyBcImlzLWhpZGRlblwiXG4gICAgQCRib2R5LnJlbW92ZUNsYXNzIFwiZ2FtZS1vdmVyXCJcbiAgICBAJGJvZHkucmVtb3ZlQ2xhc3MgXCJnYW1lLWVuZFwiXG4gICAgQCRzaGVyaWZmLnJlbW92ZUNsYXNzIFwiaXMtZGVhZFwiXG4gICAgQCRzaGVyaWZmLnJlbW92ZUNsYXNzIFwiaXMtZ29uZVwiXG4gICAgXG4gIGRlYXRoID0gPT5cbiAgICBAdG90YWxUaW1lID0gMFxuICAgIEAkb3Bwb25lbnQuYWRkQ2xhc3MgXCJpcy1zaG9vdGluZ1wiXG4gICAgQCRzaGVyaWZmLmFkZENsYXNzIFwiaXMtZGVhZFwiXG4gICAgc2V0VGltZW91dCAoPT5cbiAgICAgIEAkc2hlcmlmZi5hZGRDbGFzcyBcImlzLWdvbmVcIlxuICAgICAgQCRvcHBvbmVudC5yZW1vdmVDbGFzcyBcImlzLXNob290aW5nXCJcbiAgICAgIEAkcmVzdWx0UFMuaHRtbCBcIkdhbWUgT3ZlclwiXG4gICAgICBAJGR1ZWxCdXR0b24ucmVtb3ZlQ2xhc3MgXCJpcy1oaWRkZW5cIlxuICAgICAgQGxldmVsID0gMVxuICAgICAgQGdhbWVPdmVyID0gdHJ1ZVxuICAgICAgQCRib2R5LmFkZENsYXNzIFwiZ2FtZS1vdmVyXCJcbiAgICAgIHJldHVyblxuICAgICksIDIwMFxuICAgXG4gIHdpbiA9ID0+XG4gICAgQHRvdGFsVGltZSA9IEB0b3RhbFRpbWUgKyBAcmVzdWx0XG4gICAgQCRzaGVyaWZmLmFkZENsYXNzIFwiaXMtc2hvb3RpbmdcIlxuICAgIEAkb3Bwb25lbnQuYWRkQ2xhc3MgXCJpcy1kZWFkXCJcbiAgICBAJHJlc3VsdFBTLmh0bWwoXCJKdXN0aWNlIHNlcnZlZCBpbiBcIiArIEByZXN1bHQudG9GaXhlZCgzKSArIFwiIHNlY29uZHNcIilcbiAgICBAbGV2ZWwrK1xuICAgIEAkcmVzdWx0Q29udGludWUucmVtb3ZlQ2xhc3MgXCJpcy1oaWRkZW5cIlxuICAgIHNldFRpbWVvdXQgKD0+XG4gICAgICBAJHNoZXJpZmYucmVtb3ZlQ2xhc3MgXCJpcy1zaG9vdGluZ1wiXG4gICAgICBAJHNoZXJpZmYuYWRkQ2xhc3MgXCJpcy1hcm1lZFwiXG4gICAgICByZXR1cm5cbiAgICApLCAyMDBcbiAgICBzZXRUaW1lb3V0ICg9PlxuICAgICAgQCRzaGVyaWZmLnJlbW92ZUNsYXNzIFwiaXMtYXJtZWRcIlxuICAgICAgcmV0dXJuXG4gICAgKSwgMTAwMFxuICAgIFxuICBAJHJlc3VsdENvbnRpbnVlID0gJGRvY3VtZW50LmZpbmQgXCIuanMtcmVzdWx0LWNvbnRpbnVlXCJcbiAgQCRyZXN1bHRDb250aW51ZSAub24gXCJjbGlja1wiLCA9PlxuICAgIEAkcmVzdWx0Q29udGludWUuYWRkQ2xhc3MgXCJpcy1oaWRkZW5cIlxuICAgIHJlc2V0TWVzc2FnZXMoKVxuICAgICMgaWYgd29uIHRoZSBnYW1lXG4gICAgaWYgQGxldmVsID09IDRcbiAgICAgIGVudGVyT3V0cm8oKVxuICAgICMgY29udGludWUgYXMgbm9ybWFsXG4gICAgZWxzZVxuICAgICAgc2hvd0R1ZWxJbmZvKClcbiAgXG4gIHJlc2V0ID0gPT5cbiAgICAjIHN0b3BzIGdhbWUgaWYgbm8gcmVhY3Rpb25cbiAgICBkZWF0aCgpXG4gICAgY2xlYXJJbnRlcnZhbCBAJHRpbWVyXG4gICAgQCRkdWVsQnV0dG9uLnJlbW92ZUNsYXNzIFwiaXMtaGlkZGVuXCJcbiAgICBAJGRyYXdCdXR0b24uYWRkQ2xhc3MgXCJpcy1oaWRkZW5cIlxuICAgIFxuICBzaG93RHVlbEluZm8gPSA9PlxuICAgIEAkb3Bwb25lbnQucmVtb3ZlQ2xhc3MgXCJpcy1hcm1lZFwiXG4gICAgQCRvcHBvbmVudC5yZW1vdmVDbGFzcyBcImlzLWRlYWRcIlxuICAgIEAkb3Bwb25lbnQucmVtb3ZlQ2xhc3MgXCJvcHBvbmVudC0tMVwiXG4gICAgQCRvcHBvbmVudC5yZW1vdmVDbGFzcyBcIm9wcG9uZW50LS0yXCJcbiAgICBAJG9wcG9uZW50LnJlbW92ZUNsYXNzIFwib3Bwb25lbnQtLTNcIlxuICAgIEAkb3Bwb25lbnQuYWRkQ2xhc3MgXCJvcHBvbmVudC0tXCIgKyBAbGV2ZWxcbiAgICBzd2l0Y2ggQGxldmVsXG4gICAgICB3aGVuIDNcbiAgICAgICAgQCRtZXNzYWdlUFMuaHRtbCBcIkJpZyBHaWxseSBCb3VsZGVyIGNyYXZlcyB0aGUgam9iIG9mIHdoaXBwaW4nIGEgc3F1aXJ0IGxpa2UgeW91LiBIZSdzIGEgc2xpY2sgYXJ0aXN0IG9uIHRoZSBkcmF3ISBXYXRjaCBvdXRcIlxuICAgICAgd2hlbiAyXG4gICAgICAgIEAkbWVzc2FnZVBTLmh0bWwgXCJOYW1lJ3MgR29sZGllIEdhaWEuIFNoZSBydW5zIHRoZSBzYWxvb24gZXZlbiBpZiBzaGUgaGFzIHRvIHNlbmQgeW91IHRvIHRoZSBib25lIHlhcmQgd2l0aCB5b3VyIGJvb3RzIG9uLlwiXG4gICAgICBlbHNlXG4gICAgICAgIEAkbWVzc2FnZVBTLmh0bWwgXCJQdW1wZ3VuIEVkIGFpbid0IG5vIG1hbiB0byBtb25rZXkgd2l0aC4gWXVoIGZpZ3VyZSwgdGhpcyBiaWcgZmVsbGEgbGF5cyB5dWggJ2Nyb3NzIHRoZSBoaXRjaC1yYWNrIGFuJyBmYW4geXVoIHRvIGEgZnJhenpsZVwiXG4gICAgQCRkdWVsQnV0dG9uLnJlbW92ZUNsYXNzIFwiaXMtaGlkZGVuXCJcbiAgICBcbiAgcmVzZXRNZXNzYWdlcyA9ID0+XG4gICAgQCRtZXNzYWdlUFMuaHRtbCBcIlwiXG4gICAgQCRyZXN1bHRQUy5odG1sIFwiXCIgICBcbiAgICBcbiAgZW50ZXJEdWVsTW9kZSA9ID0+XG4gICAgQCRkdWVsQnV0dG9uLmFkZENsYXNzIFwiaXMtaGlkZGVuXCJcbiAgICBAJGRyYXdCdXR0b24ucmVtb3ZlQ2xhc3MgXCJpcy1oaWRkZW5cIlxuICAgIHJlc2V0TWVzc2FnZXMoKVxuICAgIEBkZWxheSA9IChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqKDYgLTEpKzEpKSAqIDEwMDBcblxuICAgICMgc3RhcnQgZHVlbFxuICAgIEAkZHVlbCA9IHNldFRpbWVvdXQgKCA9PlxuICAgICAgQGR1ZWxpbmcgPSB0cnVlXG4gICAgICAjIHN0eWxlIHN0YXJ0XG4gICAgICBAJG9wcG9uZW50LmFkZENsYXNzIFwiaXMtYXJtZWRcIlxuXG4gICAgICAjIHN0YXJ0IHRpbWVyXG4gICAgICBzdGFydFRpbWUgPSBEYXRlLm5vdygpXG4gICAgICBAJHRpbWVyID0gc2V0SW50ZXJ2YWwoKD0+XG4gICAgICAgIGVsYXBzZWRUaW1lID0gRGF0ZS5ub3coKSAtIHN0YXJ0VGltZVxuICAgICAgICAjIGFubm91bmNlIHJlc3VsdFxuICAgICAgICBAcmVzdWx0ID0gKGVsYXBzZWRUaW1lIC8gMTAwMClcbiAgICAgICAgaWYgQHJlc3VsdCA+IDJcbiAgICAgICAgICByZXNldCgpXG4gICAgICAgIHJldHVyblxuICAgICAgKSwgMTApXG4gICAgKSwgQGRlbGF5XG4gICAgXG4gICAgXG4gIG5vSG9ub3IgPSA9PlxuICAgICMgaWYgY2xpY2tlZCB0byBlYXJseVxuICAgIGNsZWFySW50ZXJ2YWwgQCRkdWVsXG4gICAgQCRkdWVsQnV0dG9uLnJlbW92ZUNsYXNzIFwiaXMtaGlkZGVuXCJcbiAgICBAJGRyYXdCdXR0b24uYWRkQ2xhc3MgXCJpcy1oaWRkZW5cIlxuICAgIHN3aXRjaCBAbm9Ib25vclxuICAgICAgd2hlbiAxXG4gICAgICAgIG5vSG9ub3JNZXNzYWdlID0gXCJZb3UgZG9uJ3Qgd2FudCB0byBiZSB0b28gc3VkZGVuIHdpdGggdGhlIHRyaW8uIFRoZXkgZ290dGEgZHJhdyBmaXJzdC5cIlxuICAgICAgICBAbm9Ib25vcisrXG4gICAgICB3aGVuIDJcbiAgICAgICAgbm9Ib25vck1lc3NhZ2UgPSBcIllvdSdyZSBzdXJlIHBsYXlpbicgd2l0aCBsdWNrLiBZdWggYmVzdCBnbyBhbicgcnVzdGxlIHlvdXIgYmxhbmtldHMuXCJcbiAgICAgICAgQG5vSG9ub3IrK1xuICAgICAgZWxzZVxuICAgICAgICByYW5kb20gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoNCAtIDEpICkgKyAxO1xuICAgICAgICBzd2l0Y2ggcmFuZG9tXG4gICAgICAgICAgd2hlbiAxXG4gICAgICAgICAgICBub0hvbm9yTWVzc2FnZSA9IFwiTWl4aW4nIGl0IHdpdGggc29tZSBjaGFuY2UhIEFuJyB0aGlzIHRpbWUgbycgZGF5IVwiXG4gICAgICAgICAgd2hlbiAyXG4gICAgICAgICAgICBub0hvbm9yTWVzc2FnZSA9IFwiSGFwcGVuZWQga2luZGEgc3VkZGVuLCBkaWRuJ3QgeWVyP1wiXG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgbm9Ib25vck1lc3NhZ2UgPSBcIldoYXQgdGhlIGRldmlsISBXaGF0IGZlciBraW5kIG9mIGEgdGhpbmcgc2hvd3Mgbm8gaG9ub3VyIGluIGEgZmFzdCBkcmF3LlwiICAgXG4gICAgQCRyZXN1bHRQUy5odG1sIG5vSG9ub3JNZXNzYWdlICAgICBcbiAgIFxuICAjIER1ZWwgYnV0dG9uXG4gIEAkZHVlbEJ1dHRvbi5vbiBcImNsaWNrXCIsID0+XG4gICAgaWYgQGdhbWVPdmVyXG4gICAgICByZXN0YXJ0KClcbiAgICBlbHNlXG4gICAgICBlbnRlckR1ZWxNb2RlKClcblxuIyBEcmF3IGJ1dHRvblxuICBAJGRyYXdCdXR0b24ub24gXCJjbGlja1wiLCA9PlxuICAgIGlmIEBkdWVsaW5nXG4gICAgICAjIGdvb2QgZHJhd1xuICAgICAgY2xlYXJJbnRlcnZhbCBAJHRpbWVyXG4gICAgICBAJG9wcG9uZW50LnJlbW92ZUNsYXNzIFwiaXMtYXJtZWRcIlxuICAgICAgQCRkcmF3QnV0dG9uLmFkZENsYXNzIFwiaXMtaGlkZGVuXCJcbiAgICAgIHN3aXRjaCBAbGV2ZWxcbiAgICAgICAgd2hlbiAzXG4gICAgICAgICAgaWYgQHJlc3VsdCA8IDAuMzNcbiAgICAgICAgICAgIHdpbigpXG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgZGVhdGgoKVxuICAgICAgICB3aGVuIDJcbiAgICAgICAgICBpZiBAcmVzdWx0IDwgMC40XG4gICAgICAgICAgICB3aW4oKVxuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIGRlYXRoKClcbiAgICAgICAgZWxzZVxuICAgICAgICAgIGlmIEByZXN1bHQgPCAyXG4gICAgICAgICAgICB3aW4oKVxuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIGRlYXRoKClcbiAgICBlbHNlXG4gICAgICAjIGZhaWxlZCBkcmF3XG4gICAgICBub0hvbm9yKClcbiAgICBAZHVlbGluZyA9IGZhbHNlXG4gICAgXG4jIE91dHJvIHNjcmVlbiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgXG4gIEAkb3V0cm9TY3JlZW4gPSAkZG9jdW1lbnQuZmluZCBcIi5qcy1vdXRyb1wiXG4gIEAkc2F2ZUFuZFF1aXRCdXR0b24gPSBAJG91dHJvU2NyZWVuLmZpbmQgXCIuanMtc2F2ZS1hbmQtcXVpdFwiXG4gIEAkdG90YWxUaW1lID0gQCRvdXRyb1NjcmVlbi5maW5kIFwiLmpzLXRvdGFsLXRpbWVcIlxuICBlbnRlck91dHJvID0gPT5cbiAgICBAJHRvdGFsVGltZS5odG1sIFwiVG90YWwgdGltZTogXCIgKyBAdG90YWxUaW1lLnRvRml4ZWQoMykgKyBcInNlY29uZHNcIlxuICAgIEAkcGxheVNjcmVlbi5hZGRDbGFzcyBcImlzLWhpZGRlblwiXG4gICAgQCRvdXRyb1NjcmVlbi5yZW1vdmVDbGFzcyBcImlzLWhpZGRlblwiXG4gICAgQCRib2R5LmFkZENsYXNzIFwiZ2FtZS1lbmRcIlxuICAgIEAkdG90YWxUaW1lID0gMFxuICAgIFxuICBAJHNhdmVBbmRRdWl0QnV0dG9uIC5vbiBcImNsaWNrXCIsID0+XG4gICAgcmVzdGFydCgpIl19
  //# sourceURL=coffeescript