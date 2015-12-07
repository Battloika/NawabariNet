class DomainsController < ApplicationController
  def index
    @domains = Domain.all.sort_by { |domain| -domain.pages.count }
  end
end
