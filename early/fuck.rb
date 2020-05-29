n = 6
c = [0, 0, 0, 0, 1, 0]

def jumpingOnClouds(c)
  currentCloud = 0
  jumps = 0

  until currentCloud = n - 1 do
    if c[currentCloud + 2] = 0 do
      currentCloud += 2
    end
  end
end
